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
                .catch(this.logout);
        }

        checkToken(self) {

            return new Promise(function(resolve, reject) {

                let index = document.cookie.indexOf('_id');
                let indexEnd = document.cookie.indexOf(';', index);
                let token = indexEnd === -1 ?
                    document.cookie.slice(index) :
                    document.cookie.slice(index, indexEnd);

                if (index !== -1) resolve(self);
                else reject('Token not found');

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
            // window.location = '/login';
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
                resolve(self);
            })
        }

        addEvent(self) {
            console.log('Adding event...', self);
            $('.task-header').on('click', Tasks.taskAccordion);
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


    }

    let task = new Tasks();
    task.init();

})(jQuery);