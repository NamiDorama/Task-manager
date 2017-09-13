;(function ($) {

	class Tasks{
		constructor() {

		}

		init() {
			let self = this;

			this.checkToken(self)
				.then(this.getTasks)
				.then(this.sortTasks)
				.catch(this.logout);
		}

		checkToken(self) {

			return new Promise(function(resolve, reject) {

				let index = document.cookie.indexOf('_id');
				let indexEnd = document.cookie.indexOf(';', index);
				let token = indexEnd === -1 ?
								document.cookie.slice(index) :
									document.cookie.slice(index, indexEnd);

				if(index !== -1) resolve(self);
				else reject('Token not found');

			});
		}

		getTasks(self) {
			console.log('getting task...');

			return new Promise(function(resolve, reject) {

				$.ajax({
					method: 'POST',
					url: 'http://localhost:8080/allTasks',
					success: function(res){
						self.response = res;
						resolve(self);
					},
					error: function(error){
						reject(error);
					}
				});
			});


		}

		logout() {
			// window.location = '/login';
		}

		sortTasks(self) {
			console.log('sorting tasks...', self);
			// перебирать self.response в методе each
			// добавить новые поля: task.ms - время в милисекундах, когда таск должен быть выполнен
			// в каждом таксе есть поля дата, из которого мы можем получить время м мс
			// task.day, task.month - получить день и число из той даты
			// итоговый объект в виде: {'2020-05-03': [{_id: "58af2e23222f976ac41156e4"}, {taskDay: Mon}...]}

		}

		render(self) {
			console.log('rendering tasks...');
		}


	}

	let task = new Tasks();
	task.init();

})(jQuery);