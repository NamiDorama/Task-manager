;
(function($) {

    class Tasks {
        constructor() {

        }

        init() {
            let self = this;

            this.checkToken(self)
                .then(this.getTasks)
                .then(this.sortTasks)
                .then(this.render)
                .then(this.addEvent)
                .then(Tasks.hidePreloader)
                .catch(this.errorHandler);
        }

        checkToken(self) {

            return new Promise(function(resolve, reject) {

                let index = document.cookie.indexOf('_id');
                let indexEnd = document.cookie.indexOf(';', index);
                let token = indexEnd === -1 ?
                    document.cookie.slice(index) :
                    document.cookie.slice(index, indexEnd);

                if (index !== -1) resolve(self);
                else reject('logout');

            });
        }

        getTasks(self) {
            console.log('getting task...');

            return new Promise(function(resolve, reject) {

                $.ajax({
                    method: 'POST',
                    url: 'http://localhost:8080/allTasks',
                    success: function(res) {
                        self.response = res;
                        resolve(self);
                    },
                    error: function(error) {
                        reject(error);
                    }
                });
            });
        }

        logout() {
            window.location = '/login';
        }

        sortTasks(self) {
            console.log('sorting tasks...');

	        let taskObj = {};
            let tasks = self.response.map(task => {

                task.ms = Date.parse(task.date);
	            task.day = new Date(task.ms).getDate();
	            task.month = new Date(task.ms).toLocaleString('ru', {month: 'short'});

                return task;

            }).sort((prev, next) => prev.ms - next.ms);

            let undoneTasks = tasks.filter(task => task.status === 'undone');
	        let doneTasks = tasks.filter(task => task.status === 'done');

	        self.undoneTasks = Tasks.createObjFromArr(undoneTasks);
	        self.doneTasks = Tasks.createObjFromArr(doneTasks);

	        return self;
        }

        render(self) {
            console.log('rendering tasks...', self);


            return new Promise(function(resolve, reject) {

	            let activeTaskContainer = $('#active-task .container');
	            let doneTaskContainer = $('#all-task .container');

	            let getActiveTaskHtml = self.undoneTasks ?
		                                        Tasks.renderTaskWrap(self.undoneTasks) : '';

	            let getDoneTaskHtml = self.doneTasks ?
		                                        Tasks.renderTaskWrap(self.doneTasks) : '';

	            activeTaskContainer.append(getActiveTaskHtml);
	            doneTaskContainer.append(getDoneTaskHtml);

	            if(!self.undoneTasks) {
	            	Tasks.emptyTasks(activeTaskContainer, 'У вас нет активных задач');
	            }

	            if (!self.doneTasks) {
		            Tasks.emptyTasks(doneTaskContainer, 'У вас нет завершенных задач');
	            }

                resolve(self);
            });
        }

        addEvent(self) {
            console.log('Adding event...', self);
            $('.task-header').on('click', Tasks.taskAccordion);
        }

        errorHandler(type) {
        	if(type === 'logout') {
        		this.logout();
	        } else {
        		console.error('Error');
	        }
        }

        addNewTask(task) {

        }

        static hidePreloader() {

            $('#loading').addClass('hide');
        }

        static createObjFromArr(arr) {

            let obj = {};

	        arr.forEach((task, i) => {
		        if(!obj[task.date]) {
			        obj[task.date] = arr.filter(el => el.date === task.date);
		        }
	        });

            return obj;
        }

        static taskAccordion(e) {

            let parent = $(this).closest('.task');
            let content = $(parent).find('.task-content-wrap');

            if($(parent).hasClass('open')) {
                $(content).slideUp(300, () => $(parent).removeClass('open'));
            } else {
	            $(content).slideDown(300, () => $(parent).addClass('open'));
            }
        }

        static renderTaskWrap(obj) {
			let markup = '';

			for (let day in obj) {
				markup += `<div>
                        		<div class="task-day" data-change="bg">
                            		<span class="day">${obj[day][0].day}</span>
                            		<span class="month">${obj[day][0].month}</span>
                        		</div>

                        		<div class="all-task-wrap">
                            		${Tasks.renderTasksByDay(obj[day])}
                        		</div>
                    		</div>`;
			}

			return markup;
        }

        static renderTasksByDay(array) {

        	let tasksMarkup = '';
        	let date = Date.now();

        	array.forEach(task => {

        		let taskWarning = date > task.ms ? 'warning' : '';
        		let taskStatus = task.status == 'done' ? 'success' : '';

        		tasksMarkup += `
        		<div class="task ${taskStatus || taskWarning}">
					<div class="to-do-time" data-change="bg">${task.time}</div>
					<div class="task-header flex-container">
						<span class="icon icon-arrow"></span>
						<span class="short-task-text">${task.taskText}</span>
						<span class="icon icon-cancel"></span>
					</div>
					<div class="task-content-wrap">
						<div class="time-row flex-container">
							<div class="task-icon">
								<span class="icon icon-time"></span>
							</div>
							<div class="time">${task.time}</div>
							<div class="task-icon">
								<span class="icon icon-bell"></span>
							</div>
						</div>
						<div class="task-text-row flex-container">
							<div class="task-icon">
								<span class="icon icon-list"></span>
							</div>
							<div class="text">
								${task.taskText}
							</div>
						</div>
						<div class="task-check-row check-done flex-container">
							<div class="task-icon">
								<span class="icon icon-check"></span>
							</div>
							<div class="check">
								<input type="checkbox" name="status" id="status">
								<label for="status">Я выполнил задачу</label>
							</div>
						</div>
						<div class="task-check-row check-current flex-container">
							<div class="task-icon">
								<span class="icon icon-check"></span>
							</div>
							<div class="check">
								<input type="checkbox" name="status" id="status">
								<label for="status">Задача еще не выполнена</label>
							</div>
						</div>
						<div class="task-edit-row flex-container">
							<span class="icon icon-edit"></span>
						</div>						</div>
					<div class="task-message deadline">
						<div class="message-row flex-container">
							<div class="task-icon">
								<span class="icon icon-warning"></span>
							</div>
							<div class="text">
								<p>Вы не выполнили эту задачу</p>
							</div>
						</div>
					</div>
					<div class="task-message done">
						<div class="message-row flex-container">
							<div class="task-icon">
								<span class="icon icon-star"></span>
							</div>
							<div class="text">
								<p>Поздравляем!</p>
								<p>Вы справились с задачей</p>
							</div>
						</div>
					</div>
				</div>`;

	        });

        	return tasksMarkup;
        }

        static emptyTasks(container, text) {

        	let alert = `<div class="alert empty-task"> ${text} </div>`;

        	container.append(alert);

        }


    }

    let task = new Tasks();
    task.init();

})(jQuery);