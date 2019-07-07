$(document).ready(function() {
    $(window).bind('scroll', function() {
        var navHeight = $(window).height() - 500;
        if ($(window).scrollTop() > navHeight) {
            $('.abilo-nav').addClass('on');
        } else {
            $('.abilo-nav').removeClass('on');
        }
    });

    $('body').scrollspy({ 
        target: '.abilo-nav',
        offset: 80
    });

    var btn = document.querySelector('.abilo-button-default');
    var btnText = btn.textContent;
    var width = btn.clientWidth;
    var height = btn.clientHeight;
    var svg = Snap(width, height);
    var color1 = '#FFFFFF';
    var color2 = '#810541';
    var maskOffset = btn.clientHeight;

    var border = svg.rect(0, 0, width, height).attr({ 'fill': 'none', 'stroke': color1, 'stroke-width': 2, 'class': 'border' });

    var mask = svg.path('M0,0 L' + (width + maskOffset) + ',0 L' + width + ',' + height + ' L-' + maskOffset + ', ' + height + ' Z').attr({ 'fill': 'white', 'stroke': 'white', 'class': 'mask', 'stroke-width': 0 }).transform('t-' + (width + maskOffset) + ',0');

    var maskInvert = mask.clone().transform('t0,0');

    var text = svg.text(width / 2, height / 2, btnText).attr({ 'text-anchor': 'middle', 'dominant-baseline': 'central', 'fill': color1 });

    var button = svg.group(text, border).attr({ mask: maskInvert });

    var textMasked = text.clone().attr({ 'fill': color2 });

    var borderMasked = border.clone().attr({ 'stroke': color2 });

    var masked = svg.group(textMasked, borderMasked).attr({ mask: mask });

    svg.hover(function () {
        mask.attr('stroke-width', 2);
        mask.stop().animate({ transform: 't0,0' }, 500, mina.easein);
        maskInvert.stop().animate({ transform: 't' + (width + maskOffset) + ',0' }, 500, mina.easein);
    }, function () {
        mask.stop().animate({ transform: 't-' + (width + maskOffset) + ',0' }, 350, mina.easeout, function () {
            return mask.attr('stroke-width', 0);
        });
        maskInvert.stop().animate({ transform: 't0,0' }, 350, mina.easeout);
    });

    svg.click(function () {
        return btn.click();
    });
    btn.replaceWith(svg.node);

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.abilo-scrolltop').css("display", "block");
            $('.abilo-scrolltop').fadeIn();
        } else {
            $('.abilo-scrolltop').css("display","none");
            $('.abilo-scrolltop').fadeOut();
        }
    });

	$('.abilo-scrolltop').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 100);
		return false;
	});
});

$('#abilo-carousel').on('slide.bs.carousel', function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});