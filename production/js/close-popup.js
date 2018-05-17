$(document).ready(function () {
    var $formPopup = $('#formModal');
    var $formPopupMobile = $('.mobile-modal-form');
    var timeForPopupTrigger = +$formPopup.attr('data-time');
    var timeoutId;

    // Verify if we are on the mobile breakpoint.
    var mobile = $('.device-xs, .device-sm').is(':visible');
    // Update value according to the window size.
    $(window).resize(function () {
        mobile = $('.device-xs, .device-sm').is(':visible');
    });


/*
    // Show modal after period of time
    if(timeForPopupTrigger !== 0) {
        timeoutId = setTimeout(showModal, timeForPopupTrigger * 1000);
    }

    // Track mouse movements
    $(document).mouseleave(onMouseLeave);

    // Event on modal close (any type of close)
    $formPopup.on('hidden.bs.modal', onModalClose);


    function onMouseLeave(event) {
        var y = event.originalEvent.y;
        if(y < 5) showModal();
    }
*/

    function showModal() {
        var show = false;
        var stored = localStorage.getItem('close-popup');
        if(stored) {
            var lastShown = JSON.parse(stored).lastShown;
            var lastShownTime = new Date(lastShown).getTime();
            var nowTime = new Date().getTime();

            if(nowTime - lastShownTime > 1000*60*60*24*30) {
                show = true;
            }
        }
        else show = true;

        if(show) {
            console.log('going to show', $formPopupMobile);
            if(!mobile && $formPopup.length) {
                $formPopup.modal('show');
            }
            else if(mobile && $formPopupMobile.length) {
                $formPopupMobile.removeClass('collapsed');
                localStorage.setItem('close-popup', JSON.stringify({lastShown: new Date()}));
            }
            clearTimeout(timeoutId);
        }
    }

    function onModalClose() {
        try { // Safari incognito mode doesn't allow to save in localStorage
            localStorage.setItem('close-popup', JSON.stringify({lastShown: new Date()}));
        }
        catch(err) {
            console.error(err);
        }
    }
});