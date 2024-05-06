"use strict";

document.addEventListener('DOMContentLoaded', function(){
	var menuToggle = document.querySelector('.n-header__toggle');

	if(menuToggle){
		menuToggle.addEventListener('click', function(){
			var menu = document.querySelector('.h-menu'),
				title = menuToggle.querySelector('span'),
				label = title.textContent;

			title.textContent = menuToggle.dataset.label;
			menuToggle.dataset.label = label;
			
			if(menuToggle.classList.contains('active')){
				menuToggle.classList.remove('active');
				menu.removeAttribute('style');
			} else {
				var h = menu.querySelector('.h-menu__box').offsetHeight;
				menuToggle.classList.add('active');
				menu.style.height = h+'px';
			}
		});
	}

	var header = document.querySelector('.js-header-stick');

	if(header){
		window.addEventListener("scroll", headerStick);
	}

	function headerStick(){
		var scrollTop = document.documentElement.scrollTop || document.body && document.body.scrollTop || 0;

		if(scrollTop > 100){
			header.classList.add('stick');
		} else {
			header.classList.remove('stick');
		}
	}

	var search = document.querySelector('.n-header__search');

	if(search){
		search.querySelector('.h-search__toggle').addEventListener('click', function(){
			if(search.classList.contains('active')){
				search.classList.remove('active');
			} else {
				search.classList.add('active');
			}
		});
	}

	
	if(document.getElementById('alert-toolbar')!=null){document.body.classList.add('show-alert-toolbar');}

    $('#header-search').autocomplete({
        //serviceUrl: "/ajax/search.php",
        serviceUrl: "http://ajax.loc/smsearch.php",
        paramName: 'searchString',
        dataType: "json",
        type: "POST",
        deferRequestBy: 200,
        triggerSelectOnValidInput: false,
        transformResult: function(response) {
            var ob = {
                suggestions: $.map(response.suggestions, function(dataItem) {
                    return { value: dataItem.title, data: { url: dataItem.url, type: dataItem.type, sort: dataItem.sort} };
                })
            };
            ob.suggestions.sort(function(a, b){
                if (a.data.sort > b.data.sort) return 1;
                if (a.data.sort == b.data.sort) return 0;
                if (a.data.sort < b.data.sort) return -1;
            });
            return ob;
        },
        onSelect: function(suggestion) {
            window.location = suggestion.data.url;
        },
        onSearchStart: function(){
            $('.header-search__loading').show();
        },
        onSearchComplete: function(){
            $('.header-search__loading').hide();
        },
        groupBy: 'type',
        appendTo: '.header-search__result'
    });
    $('#mobile-search').autocomplete({
        //serviceUrl: "/ajax/search.php",
        serviceUrl: "http://ajax.loc/smsearch.php",
        paramName: 'searchString',
        dataType: "json",
        type: "POST",
        deferRequestBy: 200,
        triggerSelectOnValidInput: false,
        transformResult: function(response) {
            var ob = {
                suggestions: $.map(response.suggestions, function(dataItem) {
                    return { value: dataItem.title, data: { url: dataItem.url, type: dataItem.type, sort: dataItem.sort} };
                })
            };
            ob.suggestions.sort(function(a, b){
                if (a.data.sort > b.data.sort) return 1;
                if (a.data.sort == b.data.sort) return 0;
                if (a.data.sort < b.data.sort) return -1;
            });
            return ob;
        },
        onSelect: function(suggestion) {
            window.location = suggestion.data.url;
        },
        onSearchStart: function(){
            //$('.header-search__loading').show();
        },
        onSearchComplete: function(){
            //$('.header-search__loading').hide();
        },
        groupBy: 'type',
        appendTo: '.mobile-search__result'
    });

	var winH = (window.innerHeight > 0) ? window.innerHeight : screen.height,
		winW = (window.innerWidth > 0) ? window.innerWidth : screen.width;

	$(window).resize(function(){
		winH = (window.innerHeight > 0) ? window.innerHeight : screen.height;
		winW = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	});

	$('body')
		.on('click', '.js-panel-toggle', function(){
			// если открыто
			if($('.mobile-panel').hasClass('active')){
				$('.mobile-panel').removeClass('open');
				$('body').removeClass('pop-up-enabled');
				$('body').scrollTop($('body').data('scrolltop'));
				$(window).scrollTop($('body').data('scrolltop'));

				$('.mobile-panel').removeClass('active').addClass('unactive');
					setTimeout(function(){
						$('.mobile-panel').removeClass('unactive h-auto');
					},500);
			// если закрыто
			} else {
				var scrolltop = $('body').scrollTop() ? $('body').scrollTop() : $(window).scrollTop();
				$('body').data('scrolltop', scrolltop);
				$('body').css('top', -scrolltop);

				$('.mobile-panel').removeClass('unactive');
				$('.mobile-panel').addClass('active');

				if($('.mobile-panel__container').height() > winH){
					$('.mobile-panel').addClass('h-auto');
				}

				$('body').addClass('pop-up-enabled');
				setTimeout(function(){
					$('.mobile-panel').addClass('open');
				},500);
			}
		})
		.on('click', '.mobile-panel__go-back', function(){
			$('.mobile-panel').find('.pos-2').removeClass('pos-2');
			$('.mobile-panel').find('.pos-1').removeClass('pos-1');
			$('.mobile-panel__results').removeClass('active');
		})
		.on('click', '.mobile-menu__link', function(e){
			if(!$(this).data('index')) return;
			
			var indx = $(this).data('index') - 1;

			if($('.mobile-menu__level-2 .mobile-menu__submenu').eq(indx).find('.mobile-menu__link').length){
				 e.preventDefault();	
				$('.mobile-menu, .mobile-panel__header-slide').addClass('pos-2');
				$('.mobile-menu__level-2 .mobile-menu__submenu').removeClass('active').eq(indx).addClass('active');
			}
		});



});