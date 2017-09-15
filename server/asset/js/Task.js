'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;
(function ($) {
    var Tasks = function () {
        function Tasks() {
            _classCallCheck(this, Tasks);
        }

        _createClass(Tasks, [{
            key: 'init',
            value: function init() {
                var self = this;

                this.checkToken(self).then(this.getTasks).then(this.sortTasks).then(this.render).then(this.addEvent).then(Tasks.hidePreloader).catch(this.logout);
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
                console.log('sorting tasks...');

                var taskObj = {};
                var tasks = self.response.map(function (task) {

                    task.ms = Date.parse(task.date);
                    task.day = new Date(task.ms).getDate();
                    task.month = new Date(task.ms).toLocaleString('ru', { month: 'short' });

                    return task;
                }).sort(function (prev, next) {
                    return prev.ms - next.ms;
                });

                var undoneTasks = tasks.filter(function (task) {
                    return task.status === 'undone';
                });
                var doneTasks = tasks.filter(function (task) {
                    return task.status === 'done';
                });

                self.undoneTasks = Tasks.createObjFromArr(undoneTasks);
                self.doneTasks = Tasks.createObjFromArr(doneTasks);

                return self;
            }
        }, {
            key: 'render',
            value: function render(self) {
                console.log('rendering tasks...', self);

                return new Promise(function (resolve, reject) {
                    resolve(self);
                });
            }
        }, {
            key: 'addEvent',
            value: function addEvent(self) {
                console.log('Adding event...', self);
                $('.task-header').on('click', Tasks.taskAccordion);
            }
        }], [{
            key: 'hidePreloader',
            value: function hidePreloader() {

                $('#loading').addClass('hide');
            }
        }, {
            key: 'createObjFromArr',
            value: function createObjFromArr(arr) {

                var obj = {};

                arr.forEach(function (task, i) {
                    if (!obj[task.date]) {
                        obj[task.date] = arr.filter(function (el) {
                            return el.date === task.date;
                        });
                    }
                });

                return obj;
            }
        }, {
            key: 'taskAccordion',
            value: function taskAccordion(e) {

                var parent = $(this).closest('.task');
                var content = $(parent).find('.task-content-wrap');

                if ($(parent).hasClass('open')) {
                    $(content).slideUp(300, function () {
                        return $(parent).removeClass('open');
                    });
                } else {
                    $(content).slideDown(300, function () {
                        return $(parent).addClass('open');
                    });
                }
            }
        }]);

        return Tasks;
    }();

    var task = new Tasks();
    task.init();
})(jQuery);