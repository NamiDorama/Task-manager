;
(function($) {

    class Auth {
        constructor(form) {
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

        init() {
            let self = this;
            this.event(self);
        }

        event(self) {
            this._form.on('submit', function(e) {

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

        validate(input) {
            // проверка инпутов по-одному

            let dataRegex = $(input).data('regexp');
            let reg = new RegExp(dataRegex);
            // let parent = input.closest('.input-group-lg');

            if (!reg.test(input.value)) {
                $(input).addClass('input-invalid');
                this._is_valid = false;
            } else {
                this._sendingObj[$(input).attr('name')] = $(input).val();
	            $(input).removeClass('input-invalid');
            }
        }

        showError(message) {
            // управление выводом ошибок
            this._error.text(message);

        }

        sendRequest(self) {
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
                    success: function(res) {
                        console.log(res);
                        self.setCookie(res._id, self);
                    },
                    error: function(err) {
                        console.log(err);
                        self.showError('Incorrect email or password');
                    }
                })
            }
        }

        setCookie(id, self) {
            let date = new Date();
            date.setSeconds(date.getSeconds() + 600000);

            document.cookie = this._save_checkbox.prop('checked') ?
                `_id=${id};expires=${date.toUTCString()}` :
                `_id=${id}`;

            window.location = '/task';
        }

    }

    let form = $('form[name="LoginForm"]');
    let auth = new Auth(form);
    auth.init();

})(jQuery);