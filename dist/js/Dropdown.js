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
			this.check();
			this.event(self);
		}

		colors() {

			for (let i = 0, len = this._li.length; i < len; i++) {

				$(this._li[i]).css('background-color', $(this._li[i]).data('color'));
			}
		}

		check() {
			if(localStorage['bg-color']) this.getColor();
		}

		getColor() {
			for (let i = 0, len = this._page.length; i < len; i++) {

				if ($(this._page[i]).data('change') === 'bg') {

					$(this._page[i]).css('background-color', JSON.parse(localStorage['bg-color']));

				} else if($(this._page[i]).data('change') === 'color') {

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

		event(self) {
			self._li.on('click', function(e) {

				for (let i = 0, len = self._page.length; i < len; i++) {

					if($(self._page[i]).data('change') === 'bg') {

						let color = $(this).data('color');
						$(self._page[i]).css('background-color', color);
						localStorage.setItem('bg-color', JSON.stringify(color));

					} else if ($(self._page[i]).data('change') === 'color' && $(self._page[i]).hasClass('active')) {
						$(self._page[i]).css('color', $(this).data('color'));
					}
				}

			});
		}




	}

	let dropdown = new Dropdown();
	dropdown.init();

})(jQuery);