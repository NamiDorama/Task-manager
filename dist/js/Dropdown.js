;(function($) {

	class Dropdown {
		constructor() {
			this._ul = $('.user-nav a ul');
			this._li = $('.user-nav a ul li');
			this._dropdown = $ ('.user-nav a .dropdown');
			this._page = $('*');

		}

		init() {
			let self = this;
			this.colors();
			this.event(self);
		}

		colors() {

			for (let i = 0, len = this._li.length; i < len; i++) {

				$(this._li[i]).css('background-color', $(this._li[i]).data('color'));
			}
		}

		event(self) {
			self._li.on('click', function(e) {

				// перебирать эл _page и проверять, если background-color или color = $general_color,
				// то менять его на $(this).data('color') + вынести в отдельную функцию

				console.log($(this).data('color'));
			});
		}


	}

	let dropdown = new Dropdown();
	dropdown.init();

})(jQuery);