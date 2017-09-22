'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
	var Dropdown = function () {
		function Dropdown() {
			_classCallCheck(this, Dropdown);

			this._ul = $('.user-nav a ul');
			this._li = $('.user-nav a ul li');
			this._dropdown = $('.user-nav a .dropdown');
			this._page = $('*');
		}

		_createClass(Dropdown, [{
			key: 'init',
			value: function init() {
				var self = this;
				this.colors();
				this.check();
				this.event(self);
			}
		}, {
			key: 'colors',
			value: function colors() {

				for (var i = 0, len = this._li.length; i < len; i++) {

					$(this._li[i]).css('background-color', $(this._li[i]).data('color'));
				}
			}
		}, {
			key: 'check',
			value: function check() {
				if (localStorage['bg-color']) this.getColor();
			}
		}, {
			key: 'getColor',
			value: function getColor() {
				for (var i = 0, len = this._page.length; i < len; i++) {

					if ($(this._page[i]).data('change') === 'bg') {

						$(this._page[i]).css('background-color', JSON.parse(localStorage['bg-color']));
					} else if ($(this._page[i]).data('change') === 'color') {

						$(this._page[i]).css('color', JSON.parse(localStorage['bg-color']));
					}
				}
			}

			// active() {
			// 	let task_link = $('.toggle-task-list a');
			//
			// 	task_link.on('click', tab);
			//
			// 	function tab(e) {
			// 		e.preventDefault();
			// 		let active_link = task_link.attr('.active')
			//
			// 			if(localStorage['bg-color']) {
			// 				$(active_link).css('color', JSON.parse(localStorage['bg-color']));
			// 			}
			// 	}
			// }

		}, {
			key: 'event',
			value: function event(self) {
				self._li.on('click', function (e) {

					for (var i = 0, len = self._page.length; i < len; i++) {

						if ($(self._page[i]).data('change') === 'bg') {

							var color = $(this).data('color');
							$(self._page[i]).css('background-color', color);
							localStorage.setItem('bg-color', JSON.stringify(color));
						} else if ($(self._page[i]).data('change') === 'color' && $(self._page[i]).hasClass('active')) {
							$(self._page[i]).css('color', $(this).data('color'));
						}
					}
				});
			}
		}]);

		return Dropdown;
	}();

	var dropdown = new Dropdown();
	dropdown.init();
})(jQuery);