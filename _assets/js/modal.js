// Display the modal lead form when scrolling near the bottom.
$(document).ready(function() {

    // Excute on desktop only exit early If its the mobile.
    if ($('.device-xs').is(':visible')) {
      // Don't load the modal on xs displays.
      return;
    }

    var modalForm = $('#lead-modal-wrapper');
    // If it's not the info layou  with the modal form then exit early.
    if (!modalForm.length) {
      return;
    }

    // Activate scroll in form only if no cookie data to disable it.
    // if(!$.cookie("scroll_in_form_disabled")) {
    //   var documentHeight = $(document).height();
    //   var windowHeight = $(window).height();

    //   $(window).scroll(function() {
    //     if (modalForm.hasClass('deliberately-opened') || modalForm.hasClass('deliberately-closed')) {
    //       // Don't show the modal after it was closed once.
    //       return;
    //     }

    //     var height = $(window).scrollTop() + windowHeight;

    //     if (height >= documentHeight * 0.95 || height < documentHeight * 0.70) {
    //       // Hide the form when reaching the bottom.
    //       modalForm.removeClass('in');
    //     }
    //     else if (height >= documentHeight * 0.70) {
    //       // Show the form when reaching 75% of the document height.
    //       modalForm.modal();
    //       $('.modal-backdrop').hide();
    //       modalForm.addClass('in');
    //     }
    //   });
    // }

    // When a modal that was opened automatically is closed deliberately, don't
    // open it automatically again.
    // modalForm.on('hidden.bs.modal', function () {
    //   modalForm.removeClass('deliberately-opened').addClass('deliberately-closed');
    //   $('.modal-backdrop').show();
    // });

    // When a modal that was opened automatically then add a cookie so it won't
    // open it automatically again on any other page.
    // modalForm.on('shown.bs.modal', function () {
    //   // Set a cookie to disable form slide in for 5 hours.
    //   setCookieScrollInForm();
    // });

    $('a[data-target="#lead-modal-wrapper"]').click(function() {
      // Make sure the modal is closed before trying to open it.
      modalForm.modal('hide');
      modalForm.addClass('deliberately-opened');
    });

    // Close the automatic modal a form in the background is clicked.
    // $('.form-horizontal *').click(function() {
    //   modalForm.modal('hide');
    // });

    // Create a cookie to disable the form slide in for 5 hours.
    // function setCookieScrollInForm() {
    //   // set time to now + 5 hours.
    //   var date = new Date();
    //   var minutes = 300;
    //   date.setTime(date.getTime() + (minutes * 60 * 1000));

    //   // Set cookie to store
    //   $.cookie("scroll_in_form_disabled", true, {
    //     expires : date,
    //     path    : '/',
    //     domain  : window.location.hostname
    //   });
    // }
});
