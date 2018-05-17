$(document).ready(function() {
    if (localStorage.getItem('firstFormSubmitted') === "true") {
        $('.first-form').parent().parent().addClass('hidden');
        $('.second-form').removeClass('hidden');
        $('.second-form').parents('.collapsed').removeClass('collapsed');
         localStorage.setItem('firstFormSubmitted', false);
    } else {
        $('.first-form').removeClass('hidden');
        $('.first-form').parents('.collapsed').addClass('collapsed');
    }
});
// // Handling switching between the lead forms, and automatic submission of the
// // second form.

// $(document).ready(function() {
//   var firstForm = $('form.price-form');
//   var secondForm = $('.second-form form');

//   var firstFormSubmittedBeforeThisRequest = localStorage.getItem('firstFormSubmitted');
//   var secondFormSubmitted = false;

//   // Fetch the client ip.
//   if (!localStorage.getItem('ip')) {
//     $.get('http://icanhazip.com/', function(ip){
//       localStorage.setItem('ip', ip.trim());
//     });
//   }

//   // Fill in the hidden values on the second form.
//   secondForm.find('input.ip').val(localStorage.getItem('ip'));
//   secondForm.find('input.region').val(localStorage.getItem('region'));
//   secondForm.find('input.first-name').val(localStorage.getItem('firstName'));
//   secondForm.find('input.last-name').val(localStorage.getItem('lastName'));
//   secondForm.find('input.phone').val(localStorage.getItem('phonePrefix') + '-' + localStorage.getItem('phone'));
//   if (!secondForm.find('input.procedure').val()) {
//     secondForm.find('input.procedure').val(localStorage.getItem('procedure'));
//   }
//   // Set the date.
//   // Helper function for padding the date values with a leading zero.
//   var pad = function(number) {
//     if (number < 10) {
//       number = '0' + number;
//     }
//     return number;
//   };
//   var date = new Date();
//   secondForm.find('input.date').val(pad(date.getMonth() + 1) + '/' + pad(date.getDate()) + '/' + date.getFullYear());
//   secondForm.find('input.time').val(pad(date.getHours()) + ':' + pad(date.getMinutes()));

//   // Determine which lead form to display.
//   if (firstFormSubmittedBeforeThisRequest) {
//     $('.second-form').removeClass('hidden');
//     $('.second-form').parents('.collapsed').removeClass('collapsed');

//      // Submit the second form one minute after it's displayed, in case it's
//     // ignored.
//     setTimeout(function() {
//       if (!secondForm.find('input.email').val()) {
//         // In case there are more than one form, make sure to auto-submit only
//         // the second one.
//         // secondForm.first().addClass('auto-submit').submit();
//       }
//     }, 60000);
//   }
//   else {
//     $('.first-form').removeClass('hidden');
//     $('.first-form').parents('.collapsed').addClass('collapsed');

//   }

//   // Store the lead form values, for filling them into the second form.
//   firstForm.submit(function(event) {
//     var form = $(event.currentTarget);
//     localStorage.setItem('firstName', form.find('input[name=First_Name]').val());
//     localStorage.setItem('lastName', form.find('input[name=Last_Name]').val());
//     localStorage.setItem('phonePrefix', form.find('input[name=Phone_Prefix]').val());
//     localStorage.setItem('phone', form.find('input[name=Phone]').val());
//     localStorage.setItem('region', form.find('select.region').val());
//     localStorage.setItem('procedure', form.find('select.procedure-type').val());
//   });

//   // When the second form is submitted, check if the email field is filled in
//   // another copy of the second form, in case it's auto-submitted.
//   secondForm.find('input.email').keydown(function (event) {
//     secondForm.find('input.email').val($(event.currentTarget).val());
//   });

//   // Serve the second form through ajax, to avoid showing podio's thank-you page.
//   secondForm.submit(function(event) {
//     event.preventDefault();

//     var form = $(event.currentTarget);
//     // Ignore validation in case of auto-submit.
//     if (!form.hasClass('auto-submit') && !validateEmail(form.find('input.email'))) {
//       return;
//     }
//     secondFormSubmitted = true;

//     // The request always fails from the browser's pov, due to a missing http
//     // access origin header. The lead is received nevertheless.
//     $.ajax({type: 'post', url: form.prop('action'), data: form.serialize(), async: false}).always(function() {
//       localStorage.removeItem('firstFormSubmitted');
//       $('.second-form').addClass('submitted');
//     });
//   });

//   // Submit the second form when leaving the window before it was submitted.
//   $(window).on('beforeunload', function() {
//     // Checking the copy of the storage variable, to avoid submitting the second
//     // form when leaving the page to submit the first one.
//     if (firstFormSubmittedBeforeThisRequest && !secondFormSubmitted) {
//       secondForm.first().addClass('auto-submit').submit();
//     }
//   });

//   $('input.email').focusout(function(event) {
//     validateEmail($(event.currentTarget));
//   });
// });
