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
			key: 'event',
			value: function event(self) {
				self._li.on('click', function (e) {

					// перебирать эл _page и проверять, если background-color или color = $general_color,
					// то менять его на $(this).data('color') + вынести в отдельную функцию

					console.log($(this).data('color'));
				});
			}
		}]);

		return Dropdown;
	}();

	var dropdown = new Dropdown();
	dropdown.init();
})(jQuery);