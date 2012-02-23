$(document).ready(function() {
    var options = {
        speed: 300,
        tween: 'swing',
        animateSwitching: true
    };
    var $bar = $('.bar');
    var barWidth = $bar.css('width');
    var left = $('.panel').css('left');
    var activeIndex = 0;
    var $panel;
    var move;
    $('.bar a').bind('click touchmove', function(e) {
        var newIndex = $(this).closest('li').index();
        $panel = $('.panel');
        // If the same link
        if (activeIndex == newIndex) {
            if ($panel.css('left') == left) {
                move = 100;
            } else {
                move = left;
            }
            // Toggle it
            slide(newIndex, move);
        } else {
            // If it's a new item make sure it's out
            if (options.animateSwitching && '100px' == $panel.css('left')) {
                // slide out
                $panel.animate({
                    left: left
                }, options.speed, options.tween, function() {
                    slide(newIndex, 100);
                });
            } else {
                slide(newIndex, 100);
            }
        }
        activeIndex = newIndex;
        e.preventDefault();
    });
    $('a.close').click(function() {
        $('.panel').animate({
            left: left
        }, options.speed, options.tween);
    });

    function slide(index, left) {
        $('.panel li:eq(' + index + ')').show().siblings().hide();
        $panel.animate({
            left: left
        }, options.speed, options.tween);
    }
    var $uncover = $('.uncover');
    var $uncPanel = $uncover.children('ul');
    var $target = $uncover.children('p');
    var newUnc;
    $target.find('a').click(function() {
        if ($target.css('left') == '-' + $uncPanel.outerWidth() + 'px') {
            newUnc = 0;
        } else {
            newUnc = '-' + $uncPanel.outerWidth();
        }
        $target.animate({
            left: newUnc
        }, options.speed);
    });



    $('.accordion a.open').click(function(e) {
        e.preventDefault();
        var $li = $(this).closest('li');
        if ($li.hasClass('open')) {
            if (options.animateSwitching) {
                $li.removeClass('open', options.speed);
                $('.accordion').removeClass('open', options.speed);
            } else {
                $li.removeClass('open');
                $('.accordion').removeClass('open');
            }
        } else {
            $('.accordion').addClass('open', options.speed);
            $li.addClass('open', options.speed).siblings().removeClass('open', options.speed);
        }
    });
    $('.accordion a.close').click(function(e) {
        e.preventDefault();
        $(this).closest('li').removeClass('open', options.speed);
        $('.accordion').removeClass('open', options.speed);
    });
});