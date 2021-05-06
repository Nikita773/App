const notification = require('./notification.hbs');

(function($) {

    $.fn.notification = function(object) {
        if (!object) {
            object = { type: 'success', text: 'Default message', showTime: 5000 };
        }
        render(object);
    };

    function render(object) {
        const notifications = $('.notifications');
        notifications.empty();
        notifications.append(notification(object));

        const notificationsMessage = $('.notifications__message');
        notificationsMessage.fadeOut(object.showTime);
        $('.icon-close').bind('click', function() {
            notificationsMessage.css('display', 'none');
        });
    }
})(jQuery);