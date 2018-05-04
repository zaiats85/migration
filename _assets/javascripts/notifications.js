$(document).ready(function() {
    if(!"Notification" in window) {
        console.log("This Browser does not support notifications");
    }
    else if(Notification.permission === 'default') {
        Notification.requestPermission(function(permission) {
            console.log(permission, 'user choose');
        });
    }
    else {
        console.log(Notification.permission);
    }


    notifyMe("Hi medicart");

    function notifyMe(notificationText) {
        if(Notification.permission === 'granted') {
            var notification = new Notification(notificationText);
            notification.onerror = function(err) {
                console.log(err, 'error');
            }
        }

    }
});