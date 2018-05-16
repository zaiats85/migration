  //This script handles the (1) focus out event of any field (2) submit button clicked event
//it validates all inputs. if all is fine then globalStatus=true and submit button event returns true.

var okMessage = '<span>תודה :)</span>';

function isMobile () {
    var retVal = false;
    try {
        retVal = /(iPhone|iPod|iPad|Android|Windows (Phone|Mobile))/i.test(navigator.userAgent);
    } catch (e) {}
    return retVal;
}

$(document).ready(function () {
    var globalStatus = true,
        prefixPhoneIsOk = false,
        phnoneIsOk = false,
        mobile = $('.device-xs, .device-sm').is(':visible');

        if (!mobile) {
          // $('form').find('input').attr('placeholder', '');
          // $('form').find('select').find('option:first-child').text('');
        }

    //full name focus out
    $(".name-helper").focusout(function () {
        var $form = $(this).parents('form');
        $(this).parents('.input-wrapper').find('.icon').removeClass('focus');
        $(this).val() && validateName($form, true);
    });

    $(".phone-helper").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) ||
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $(".phone-helper").bind('paste', function(e) {
        e.preventDefault();
    });

    //phone focus out
    $(".phone-helper").focusout(function () {
      var $form = $(this).parents('form');
      $(this).parents('.input-wrapper').find('.icon').removeClass('focus');
      $(this).val() && validatePhone($form, true);
      //console.log($(this).val());
    });

    //procedure type focus out
    $(".procedure-type").focusout(function () {
      var $form = $(this).parents('form');
      $(this).parents('.input-wrapper').find('.icon').removeClass('focus');
      $(this).val() && validateProcedureType($form, true);
      !$(this).val() && $(this).parents('.input-wrapper').find('.icon').removeClass('checked icon-ok');
    });

    //procedure change
    $(".procedure-type").change(function () {
      var $form = $(this).parents('form');
      $(this).parents('.input-wrapper').find('.icon').removeClass('focus');
      $(this).val() && validateProcedureType($form, true);
      !$(this).val() && $(this).parents('.input-wrapper').find('.icon').removeClass('checked icon-ok');
    });

    //region focus out
    $(".region").focusout(function () {
      var $form = $(this).parents('form');
      $(this).parents('.input-wrapper').find('.icon').removeClass('focus');
      $(this).val() && validateRegion($form, true);
      !$(this).val() && $(this).parents('.input-wrapper').find('.icon').removeClass('checked icon-ok');
    });

    //region change
    $(".region").change(function () {
      var $form = $(this).parents('form');
      $(this).parents('.input-wrapper').find('.icon').removeClass('focus');
      !$(this).val() && $(this).parents('.input-wrapper').find('.icon').removeClass('checked icon-ok');
      $(this).val() && validateRegion($form, true);
    });

    //button submit form clicked
    $(".second-form form").submit(function (event) {
      if (validateEmail($('.email', this))) {
        $(this).parents('.forms-container').find('form.price-form').find('[name="Email"]').val($('.email', this).val());
        $(this).parents('.forms-container').find('form.price-form').attr('action', "https://leads.leaddistributionsystems.com/genericPostlead.php");
        window.realSubmit = true;
        if (isMobile()) {
           $(this).parents('.forms-container').find('form.price-form').find('[name="Sub_ID"]').val('mobile');
        } else {
           $(this).parents('.forms-container').find('form.price-form').find('[name="Sub_ID"]').val("");
        }
        $(this).parents('.forms-container').find('form.price-form').submit();
      }
    });

    $("form.price-form").submit(function (event) {
      var self = this;
      globalStatus = true;

      if (window.realSubmit) {
          window.realSubmit = undefined;
          // MY CODE //////////////////////////////////////////////
          // Close form on mobile
          $('.collapsed-button').click();

          // Show modal
          $('#thxModal').load('../thx-page', function() {
              $('#thxModal').modal('show');
          });

          // $('.first-form').parent().parent().addClass('hidden');
          //
          // $('.mobile-lead-form .first-form').addClass('hidden');
          // $('.second-form').removeClass('hidden');
          // $('.second-form').parents('.collapsed').removeClass('collapsed');
          // END //////////////////////////////////////////////////
          return true;
      }
      // Get the wrapping form of the element.
      var $form = $(event.currentTarget),
           firstForm = $('.first-form', $(this).parents(".forms-container")),
           secondForm = $('.second-form', $(this).parents('.forms-container'));

      validateName($form, true);
      validatePhone($form, true);
      validateProcedureType($form, true);
      validateRegion($form, true);

      if (globalStatus) {
        //localStorage.setItem('firstFormSubmitted', true);
        $form.attr('action', "https://leads.leaddistributionsystems.com/genericPostlead.php");
        window.realSubmit = true;
        $form.submit();
      }

      return globalStatus;
    });

    // Sync a .focus class on the icons related to the inputs.
    $('.input-wrapper .has-icon')
      .focus(function (event) {
        $(event.currentTarget).parents('.input-wrapper').find('.icon').addClass("icon-"+$(event.currentTarget).data('type')).addClass('focus').removeClass('checked icon-ok').removeClass('failed icon-cancel');
      });

    //validate the First (and Last) name
    function validateName($form, showMessageBlock) {

      var element = $form.find(".name-helper");

      $form.find(".first-name").val("");
      $form.find(".last-name").val("");

      $("#validationMessage1").html("");

      var fullName = $(element).val().replace(/^\s+|\s+$/g, '');
      var isNumberInFullname = fullName.match(/\d+/g);
      // var fullNameMessage = "<span>נא להזין שם מלא וחוקי</span>";
      var message = "<span>נא להכניס שם תקין</span>";
        if (fullName.length < 2 || isNumberInFullname !== null) {
            if (isNumberInFullname !== null) { message = message; }
            if(showMessageBlock) {
                showMessage(element, message);
                showImage(element, true);
            }
            globalStatus = false;
            return;
        }
        else {
            var lastName = "";
            var firstName = fullName;

            //check if last name was entered
            if (fullName.indexOf(" ") > -1) {
                lastName = fullName.substr(fullName.indexOf(" "), fullName.length).replace(/\s+/, "");
                firstName = fullName.replace(lastName, "").replace(/\s+/g, "");

                // check that first and last name are not one character
                if (lastName.length == 1 || firstName.length == 1) {
                    if(showMessageBlock) {
                        showMessage(element, message);
                        showImage(element, true);
                    }
                    globalStatus = false;
                    return;
                }
            }
            // check that any charcter does not appears 3 times in arrow
            // start with the last name
            var count = 0;
            var ezer = 0;
            if (firstName.length >= 3) {
                for (var i = 0; i < firstName.length - 1; i++) {
                    count = 0;
                    ezer = 0;
                    for (var t = 0; t < (firstName.length); t++) {
                        if (firstName.substr(i, 1) == firstName.substr(t, 1) && (ezer == 0 || ezer - t == -1)) {
                            count += 1;
                            ezer = t;
                            if (count >= 3) {
                                if(showMessageBlock) {
                                    showMessage(element, message);
                                    showImage(element, true);
                                }
                                globalStatus = false;
                                return;
                            }
                        }
                    }
                }
            }
            // and with the last name
            if (lastName.length >= 3) {
                for (var x = 0; x < lastName.length - 1; x++) {
                    count = 0;
                    ezer = 0;
                    for (var z = 0; z < (lastName.length); z++) {
                        if (lastName.substr(x, 1) == lastName.substr(z, 1) && (ezer == 0 || ezer - z == -1)) {
                            count += 1;
                            ezer = z;
                            if (count >= 3) {
                                if(showMessageBlock) {
                                    showMessage(element, message);
                                    showImage(element, true);
                                }
                                globalStatus = false;
                                return;
                            }
                        }
                    }
                }
            }
            $form.find(".first-name").val(firstName);
            $form.find(".last-name").val(lastName);
        }

      if(showMessageBlock) {
          showImage(element, false);
          toggolePopOver(element, okMessage);
      }
    }

    // validate the phone
    function validatePhone($form, showMessageBlock) {

      var element = $form.find(".phone-helper");

      element.html("");
      element.html("&nbsp;");

      var currentVal = element.val();

      if (currentVal.length < 9) {
          if(showMessageBlock) {
              showMessage(element, "<span>מספר הטלפון קצר מדי</span>");
              showImage(element, true);
          }
          globalStatus = false;
          return;
      }
      if (currentVal.length > 10) {
          if(showMessageBlock) {
              showMessage(element, "<span>מספר הטלפון ארוך מדי</span>");
              showImage(element, true);
          }
          globalStatus = false;
          return;
      }

      var prefixLength = (currentVal.length === 9) ? 2 : 3;
      var phonePrefix = currentVal.substr(0, prefixLength);


      // get the phone value (after the prefix)
      var phone = currentVal.substr(prefixLength),
          firstDigit = phone.substr(0, 1);

      //when phone prefix includes two digits check that the number doesn't start with 0 1 2 3 4 and that the prefix is valid
      if (phonePrefix.length == 2) {
          if (firstDigit.match(/[0-4]/g) || (-1 == $.inArray(phonePrefix, ["02", "03", "04", "08", "09"]))) {
              if(showMessageBlock) {
                  showMessage(element, "<span>יש למלא טלפון תקין</span>");
                  showImage(element, true);
              }
              globalStatus = false;
              return;
          }
      }

      // when phone prefix includes three digits check that the number doesn't start with 0 1 and that the prefix is valid
      if (phonePrefix.length == 3) {
          if (firstDigit.match(/[0-1]/g) || (-1 == $.inArray(phonePrefix, ["050" ,"052" ,"053" ,"054" ,"055" ,"057" ,"058" ,"072" ,"073" ,"074" ,"075" ,"076" ,"077" ,"078" ,"079"]))) {
              if(showMessageBlock) {
                  showMessage(element, "<span>יש למלא טלפון תקין</span>");
                  showImage(element, true);
              }
            globalStatus = false;
            return;
          }
      }

      // check the phone for 5+ occurance (in sequence = one after one) of the same digit
      for (var i = 0; i <= 9; i++) { //select digit by digit thru all the digits
          var count1 = 0;
          var ezer = 0;
          var s_i = i.toString();

          for (var t = 0; t <= phone.length - 1; t++) { // check for same digit in sequence
              if ((phone.substr(t, 1) == s_i && t == 0) || (phone.substr(t, 1) == s_i && t - ezer == 1)) {
                  count1 += 1;
                  ezer = t;
              }
          }

          if (count1 >= 5) {
              if(showMessageBlock) {
                  showMessage(element, "<span>יש למלא טלפון תקין</span>");
                  showImage(element, true);
              }
              globalStatus = false;
              return;
          }

      }

      // If all validation above past show V ok sign.
      if(showMessageBlock) {
          showImage(element, false);
          toggolePopOver(element, okMessage);
      }

      // Set the true phone prefix and true phone number to be submitted.
      $form.find(".phone-prefix").val(phonePrefix);
      $form.find(".phone").val(phone);
    }

    // Validate the procedure type.
    function validateProcedureType($form, showMessageBlock) {

      var element = $form.find(".procedure-type");
      if (!element.length)
        element = $('input[name="Procedure_Type[]"]', $form);

      $("#validationMessage3").html("");
        $("#validationImage3").html("&nbsp;");
        var Procedure_Type = $(element).val();
        if (!Procedure_Type) {
            if(showMessageBlock) {
                showMessage(element, "<span>נא לבחור סוג טיפול</span>");
                showImage(element, true);
            }
            globalStatus = false;
        }
        else {
            if(showMessageBlock) {
                showImage(element, false);
                toggolePopOver(element, okMessage);
            }
        }
    }

    // Validate the region.
    function validateRegion($form, showMessageBlock) {

        var element = $form.find(".region");
        if (!element.length)
            element = $('input[name="Region[]"]', $form);

        $("#validationMessage4").html("");
        $("#validationImage4").html("&nbsp;");
        var Region = $(element).val();
        if (!Region) {
            if(showMessageBlock) {
                showMessage(element, "<span>נא לבחור אזור</span>");
                showImage(element, true);
            }
            globalStatus = false;
        }
        else {
            if(showMessageBlock){
                showImage(element, false);
                toggolePopOver(element, okMessage);
            }
        }
    }

    ///////////////////////////// TEST CODE ///////////////////////////////////////


    $(".form-input").on('focusout change', function() {
        globalStatus = true;

        var form = $(this).closest("#lead-form");

        validateName(form, false);
        validatePhone(form, false);
        validateProcedureType(form, false);
        validateRegion(form, false);

        if(globalStatus) {
            var scroll = $(".floating-form:not(.collapsed)").innerHeight();
            $(".floating-form:not(.collapsed)").animate({ scrollTop: scroll }, 500);
        }
    });
    //$(".form-input").focusout(function() {
    //
    //});



});

function validateEmail (element) {
  var emailForm = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailForm.test(element.val())) {
    var message = "<span>דואר אלקטרוני לא תקין</span>";
    showMessage(element, message);
    showImage(element, true);
    return false;
  }

  showImage(element, false);
  toggolePopOver(element, okMessage);
  return true;
}

// Show the error message for the appropriate element.
function showMessage(elemetId, message) {
  toggolePopOver(elemetId, message);
}

// Show either the v image or x image (for good or bad input).
function showImage(elemetId, isX, isClear) {

  var $element = $(elemetId);
  var $icon = $element.parents('.input-wrapper').find('.icon');
  var iconType = "icon-" + $element.data("type");
  // Keep focus icon display if the input field is empty.
  if (!$element.val()) {
      $icon.toggleClass(iconType, true).toggleClass("failed icon-cancel", false).toggleClass("checked icon-ok", false);
  }
  else {
    try {
      if (isClear) {
        $element.html("&nbsp;");
        return;
      }
    }
    catch (err) {
    }

    if (isX) {
      $icon.toggleClass(iconType, false).toggleClass("failed icon-cancel", true).toggleClass("checked icon-ok", false);
    }
    else {
      $icon.toggleClass(iconType, false).toggleClass("checked icon-ok", true).toggleClass("failed icon-cancel", false);
    }
  }
}

// Toggle the view mode of the popover.
function toggolePopOver(elementId, message) {

  var $element = $(elementId);
  var $bubblePlaceHolder = $element.parent('.input-wrapper');
  var $bubble = $element.parent('.input-wrapper').find('.bubble');
  $bubble.html(message + '<div class="arrow"></div>');
  $bubble.fadeIn(1200);

  setTimeout(function(){
    $bubble.fadeOut(800);
  }, 3500);
}
