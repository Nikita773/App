(function($) {
    $.fn.radialTimer = function(dataObj) {

        if (!Object.keys(dataObj).length) {
            const time = 10;
            const content = `<span class="time__number">${time}</span><span class="time__label">min</span>`;
            const onTimeout = () => {
                alert('Default options is working');
            };

            dataObj = { time, content, onTimeout };
        }

        let time = dataObj.time;

        const timeHolder = $('.time');
        const minuteHand = $('.minute-hand');
        const pieceLeft = $('.piece--left');
        const pieceRight = $('.piece--right');

        timeHolder.html(dataObj.content);

        clearAnimation(pieceLeft, pieceRight, minuteHand);
        setAnimation(pieceRight, pieceLeft, minuteHand, time);

        let interval = setInterval(() => {
            if (time > 1) $('.time__number').html(time -= 1);
        }, 1 * 60 * 1000);

        let timeout = setTimeout(() => {
            pieceLeft.css('z-index', '0');
            clearAnimation(pieceLeft, pieceRight, minuteHand);
            dataObj.onTimeout();
        }, time * 60 * 1000);

        $.fn.radialTimer.stop = function() {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    };

    function setAnimation(pieceRight, pieceLeft, minuteHand, time) {
        minuteHand.css('animation', `rotateMinuteHand ${time * 60}s linear`);
        pieceRight.css('animation', `changeOpacityPieces ${time * 60}s steps(1, end) reverse`);
        pieceLeft.css('animation', `changeOpacityPieces ${time * 60}s steps(1, end)`);
    }

    function clearAnimation(pieceRight, pieceLeft, minuteHand) {
        minuteHand.css('animation', '');
        pieceLeft.css('animation', '');
        pieceRight.css('animation', '');
    }

}(jQuery));