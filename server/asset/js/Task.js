'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
	var Tasks = function () {
		function Tasks() {
			_classCallCheck(this, Tasks);
		}

		_createClass(Tasks, [{
			key: 'init',
			value: function init() {
				var self = this;

				this.checkToken(self).then(this.getTasks).then(this.sortTasks).catch(this.logout);
			}
		}, {
			key: 'checkToken',
			value: function checkToken(self) {

				return new Promise(function (resolve, reject) {

					var index = document.cookie.indexOf('_id');
					var indexEnd = document.cookie.indexOf(';', index);
					var token = indexEnd === -1 ? document.cookie.slice(index) : document.cookie.slice(index, indexEnd);

					if (index !== -1) resolve(self);else reject('Token not found');
				});
			}
		}, {
			key: 'getTasks',
			value: function getTasks(self) {
				console.log('getting task...');

				return new Promise(function (resolve, reject) {

					$.ajax({
						method: 'POST',
						url: 'http://localhost:8080/allTasks',
						success: function success(res) {
							self.response = res;
							resolve(self);
						},
						error: function error(_error) {
							reject(_error);
						}
					});
				});
			}
		}, {
			key: 'logout',
			value: function logout() {
				// window.location = '/login';
			}
		}, {
			key: 'sortTasks',
			value: function sortTasks(self) {
				console.log('sorting tasks...', self);
				// перебирать self.response в методе each
				// добавить новые поля: task.ms - время в милисекундах, когда таск должен быть выполнен
				// в каждом таксе есть поля дата, из которого мы можем получить время м мс
				// task.day, task.month - получить день и число из той даты
				// итоговый объект в виде: {'2020-05-03': [{_id: "58af2e23222f976ac41156e4"}, {taskDay: Mon}...]}
			}
		}, {
			key: 'render',
			value: function render(self) {
				console.log('rendering tasks...');
			}
		}]);

		return Tasks;
	}();

	var task = new Tasks();
	task.init();
})(jQuery);