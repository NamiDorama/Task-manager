'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;
(function ($) {
    var Auth = function () {
        function Auth(form) {
            _classCallCheck(this, Auth);

            this._form = form;
            this._inputs = $('input[required]');
            this._save_checkbox = $('input[name="save-password"]');
            this._sendingObj = {
                login: '',
                password: ''
            };
            this._is_valid = true;
            this._error = $('.error');
        }

        _createClass(Auth, [{
            key: 'init',
            value: function init() {
                var self = this;
                this.event(self);
            }
        }, {
            key: 'event',
            value: function event(self) {
                this._form.on('submit', function (e) {

                    e.preventDefault();
                    // переменная выключатель - true/false
                    self._is_valid = true;
                    // перебираем инпуты, на каждом инпуте вызывать метод валидации
                    self._inputs.each(function (index, input) {
                        self.validate(input);
                    });
                    self.sendRequest(self);
                });
            }
        }, {
            key: 'validate',
            value: function validate(input) {
                // проверка инпутов по-одному

                var dataRegex = $(input).data('regexp');
                var reg = new RegExp(dataRegex);
                // let parent = input.closest('.input-group-lg');

                if (!reg.test(input.value)) {
                    $(input).addClass('input-invalid');
                    this._is_valid = false;
                } else {
                    this._sendingObj[$(input).attr('name')] = $(input).val();
                    $(input).removeClass('input-invalid');
                }
            }
        }, {
            key: 'showError',
            value: function showError(message) {
                // управление выводом ошибок
                this._error.text(message);
            }
        }, {
            key: 'sendRequest',
            value: function sendRequest(self) {
                // проверка на переключатель валидации true/false
                // если форма не валидна, вызываем метод вывода ошибки + ретерн
                if (!self._is_valid) {
                    return self.showError('Form is invalid');
                } else {
                    self._error.text('');
                    $.ajax({
                        method: 'POST',
                        data: JSON.stringify(this._sendingObj),
                        contentType: 'application/json',
                        url: 'http://localhost:8080/login',
                        success: function success(res) {
                            console.log(res);
                            self.setCookie(res._id, self);
                        },
                        error: function error(err) {
                            console.log(err);
                            self.showError('Incorrect email or password');
                        }
                    });
                }
            }
        }, {
            key: 'setCookie',
            value: function setCookie(id, self) {
                var date = new Date();
                date.setSeconds(date.getSeconds() + 600000);

                document.cookie = this._save_checkbox.prop('checked') ? '_id=' + id + ';expires=' + date.toUTCString() : '_id=' + id;

                window.location = '/task';
            }
        }]);

        return Auth;
    }();

    var form = $('form[name="LoginForm"]');
    var auth = new Auth(form);
    auth.init();
})(jQuery);