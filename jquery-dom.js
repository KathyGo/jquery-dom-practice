$(function() {
	$('.form').on('submit', function(evt) {
		evt.preventDefault();
		const title = $(this).children().eq(0).val();
		const rating = $(this).children().eq(1).val();
		if (title.length >= 2 && isFinite(rating) && rating >= 0 && rating <= 10) {
			$('ul').append('<li>' + title + '  ' + rating + " <button class='remove-btn'>remove</button></li>");
			$('.remove-btn').on('click', function() {
				$(this).parent().remove();
			});
		} else {
			alert('Please enter a valid Tile (at least 2 characters) and Rating between 0 to 10!');
		}
		$('#title').val('');
		$('#rating').val('');
	});

	$('#sort-btn').on('click', sortUL);

	function sortUL() {
		const type = $('#sort-by').val();
		const lis = $('li');
		let switching = true;
		let shouldswitch = false;
		let i = 0;
		if (type === 'Title') {
			while (switching) {
				switching = false;
				for (i = 0; i < lis.length - 1; i++) {
					shouldswitch = false;
					let currTitle = $('li').get(i).innerText.split(' ')[0];
					let nextTitle = $('li').get(i + 1).innerText.split(' ')[0];
					if (currTitle.toLowerCase() > nextTitle.toLowerCase()) {
						shouldswitch = true;
						break;
					}
				}

				if (shouldswitch) {
					$('li').eq(i + 1).insertBefore($('li').eq(i));
					switching = true;
				}
			}
		} else if (type === 'Rating') {
			while (switching) {
				switching = false;
				for (i = 0; i < lis.length - 1; i++) {
					shouldswitch = false;
					let currRating = $('li').get(i).innerText.split(' ').slice(-2, -1);
					let nextRating = $('li').get(i + 1).innerText.split(' ').slice(-2, -1);
					if (Number(currRating) < Number(nextRating)) {
						shouldswitch = true;
						break;
					}
				}
				if (shouldswitch) {
					$('li').eq(i + 1).insertBefore($('li').eq(i));
					switching = true;
				}
			}
		}
	}
});
