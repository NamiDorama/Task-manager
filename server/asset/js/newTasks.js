'use strict';

;(function ($) {

	var plus = $('.add-task');

	console.log(plus);

	plus.on('click', function (e) {

		console.log(e);
	});
})(jQuery);