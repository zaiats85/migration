// Dropdown Menu Fade on hover.
jQuery(document).ready(function () {
    var $siteWrapper = $('.site-wrapper');
    var $contentWrapper = $('.content-wrapper');
    var $slideForm = $('.slide-form');

    if (navigator.userAgent.match(/Mobile/)) {
        if (screen.width < 780) {
            $("[name=Sub_ID]").val('mobile');
        } else {
            $("[name=Sub_ID]").val('tablet');
        }
    } else {
        $("[name=Sub_ID]").val('desktop');
    }

    // Verify if we are on the mobile breakpoint.
    var mobile = $('.device-xs, .device-sm').is(':visible');
    // Update value according to the window size.
    $(window).resize(function () {
        mobile = $('.device-xs, .device-sm').is(':visible');
    });

    // Hide mobile menu when clicking outside.
    // Make sure it only execute on mobile.
    $(document).click(function (e) {
        if (mobile) {
            // If the clicked element is either the button or the menu itself then
            // do nothing and return early.
            if ($(e.target).closest('.navbar-collapse, .navbar-toggle').length) {
                return;
            }
            if ($('.navbar-collapse').is(':visible')) {
                $('.navbar-collapse').collapse('hide');
                $('.navbar-toggle').addClass("collapsed", 200);
            }
        }
    });

    $('.navbar-toggle').click(function () {
        $('.navbar-toggle').toggleClass('collapsed');
    });

    // Display the modal lead form on the pros layout when clicking.
    // Make sure it only execute on mobile.
    $('.tbl-row *').click(function () {
        if (mobile) {
            var modalForm = $('#pros-lead-modal-wrapper');
            modalForm.modal();
            modalForm.modal('show');
        }
    });

    // Design extended side navigation on hover
    var toggle = function () {
        $(this).toggleClass("extended", 500);
    };
    $(".strip-navigation").hoverIntent(toggle, toggle);

    // Change phone icon image color upon form submit button hover.
    var toggle1 = function () {
        $(this).parents('.first-form').find('.icon-wrapper').toggleClass("active");
        $(this).parents('.second-form').find('.icon-wrapper').toggleClass("active");
    };
    $(".submit").hover(toggle1, toggle1);


    var setTimeoutId;
    // Moving the bottom form
    $(window).scroll(function () {
        if (!$('.stop-block').length) {
            return;
        }

        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            var form = $('.mobile-lead-form.collapsed');
            if (form.length) {
                form.css('visibility', 'hidden');
                setTimeout(function () {
                    form.css('visibility', '');
                }, 1000);
            }
        }
        if ($(window).scrollTop() == 0) {
            $('#backToTop').css('display', 'none');
        } else {
            $('#backToTop').css('display', 'block');
        }
    });

    //Back to top button show/hide
    $siteWrapper.scroll(function () {
        var scrollTop = $siteWrapper.scrollTop();

        // Action when user scrolled to bottom
        if(scrollTop + $siteWrapper.height() === $contentWrapper.height()) {
            if($slideForm) $slideForm.removeClass('collapsed');
        }

        // 30 is margin between content and footer
        var bottomScrollValue = $('#info').height() + $('.info-footer').height() + 30;
        var windowHeight = $('.site-wrapper').height();
        if(scrollTop + windowHeight >= bottomScrollValue) {
            $('.pointer-arrow-mobile').removeClass('unvisible');
        }

        //Action if reached top
        if (scrollTop <= 0) {
            $('#backToTop').css('display', 'none');
            $('.floating-top-form').addClass('unvisible');
            // $('.floating-form').addClass('unvisible');
            clearTimeout(setTimeoutId);
            setTimeoutId = undefined;
        } else {
            $('#backToTop').css('display', 'block');
            $('.floating-top-form').removeClass('unvisible');
            if (setTimeoutId) return;
            setTimeoutId = setTimeout(function () {
                $('.floating-form').removeClass('unvisible');
            }, 2000);
        }
    });
    $('#backToTop').on('click', function () {
        $("html, body").animate({scrollTop: 0}, 500);
        $(".site-wrapper").animate({scrollTop: 0}, 500);
        return false;
    });


    //Desktop search icon click action
    $('.desktop-search').click(function (event) {
        event.stopPropagation();
        $('.desktop-search').toggleClass('active');
        $('.desktop-search-block').toggleClass('hidden');
        $('.desktop-search .icon-search').toggleClass('hidden');
        $('.desktop-search .icon-cancel').toggleClass('hidden');
        $('.desktop-search-block .header-search-input').focus();
    });
    $('.desktop-search-block').click(function (event) {
        event.stopPropagation();
    });
    $(window).click(function () {
        if ($('.desktop-search').hasClass('active')) {
            $('.desktop-search').click();
        }
    });


    //Flip prescription card in desktop info page
    var $prescription = $('.prescription-desktop');
    var $flipper = $('.flipper-container');
    var $presc = $('.prescription');
    var $flipForm = $('.flipper-form-wrapper');

    $flipper.css({'height': ($presc.innerHeight() + 20) + 'px'});
    $('.prescription-button').click(function () {
        $prescription.addClass('flip');
        $flipper.css({'height': ($flipForm.innerHeight() + 20) + 'px'});
    });
    $('.prescription-desktop .collapsed-button').click(function () {
        $prescription.removeClass('flip');
        $flipper.css({'height': ($presc.innerHeight() + 20) + 'px'});
    });


    //Header open/close form
    $('.header-call-to-action').click(showDesktopForm);
    $('.open-form-block-wrapper .primary-button').click(showDesktopForm);
    $('.modal-form .collapsed-button').click(function () {
        $('#formModal').modal('hide');
    })
});

function showDesktopForm() {
    $('#formModal').modal('show');
}
