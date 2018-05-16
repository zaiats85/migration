$(document).ready(function () {
    //On load get accessibility cookies and add to body (session)
    var cookieClasses = getCookie('accessibility');
    if (cookieClasses != "") {
        $('body').addClass(decodeURI(cookieClasses));
    } else {
        $('body').addClass('default-font');
    }

    // First check to see if the platform is an iPhone or iPod
    if(/iP/.test(navigator.platform) && /Safari/i.test(navigator.userAgent)){
        window.mobileSafari = true;
    }

    var windowHeight;
    // Set the div height
    function setHeight($navWrapper) {
        var new_height = $(this).height();
        windowHeight = new_height;
        $navWrapper.css('height', new_height);
    }
    function setMinHeight($element) {
        var new_height = $(this).height() - 55;
        $element.css('height', new_height);
    }

    if(window.mobileSafari) {
        setHeight($('.nav-block'));
        $(window).resize(function() {
            setHeight.call(this, $('.nav-block'));
        });
    }

    setMinHeight($('.mobile-fixed-height'));
    $(window).resize(function() {
        setMinHeight.call(this, $('.mobile-fixed-height'));
    });


    //Default state of menu
    function restoreDefaultState() {
        $('.mobile-subitems-wrapper').css('margin-left', '-105%');
        $('.header-accessibility').css('margin-left', '-105%');
        $('.header-search').css('margin-left', '-105%');
        $('.header-main-menu').css('overflow-y', 'auto');
        $('.search-button').removeClass('opened-menu');
        $('.accessibility-button').removeClass('opened-menu');
    }

    //Hide element
    function hideElement(targetEl, animate, callback) {
        if(animate) {
            $(targetEl).stop().animate({'margin-left': '-105%'}, 300, function() {
                if(callback) callback();
            });
        } else {
            $(targetEl).css('margin-left', '-105%');
        }
    }

    //Show element
    function showElement(targetEl, animate, callback) {
        if(animate) {
            $(targetEl).stop().animate({'margin-left': '0'}, 300, function() {
                if(callback) callback();
            });
        } else {
            $(targetEl).css('margin-left', '0');
        }
    }

    //Open mobile menu on toggle button click
    $('#navbar-toggle').click(function (e) {
        var targetEl = $($(e.currentTarget).attr('data-target'))[0];

        if($(targetEl).hasClass('collapse')) {
            $(targetEl).toggleClass('collapse');
            showElement('.mobile-menu-wrapper', true);
            $('.site-wrapper').css('overflow-y', 'hidden');
            if(window.mobileSafari) {
                $('.nav-wrapper').css({'height': windowHeight/*, 'overflow-y': 'hidden'*/});
                $('.logo-wrapper .logo .visible-xs').css('z-index', '0');
            }
        }
        else {
            hideElement('.mobile-menu-wrapper', true, function() {
                $(targetEl).toggleClass('collapse');
                $('.site-wrapper').css('overflow-y', 'auto');
                if(window.mobileSafari) {
                    $('.nav-wrapper').css({'height': 'auto'/*, 'overflow-y': 'auto'*/});
                    $('.logo-wrapper .logo .visible-xs').css('z-index', '100');
                }
                restoreDefaultState();
            });
        }
    });

    //Close mobile menu when click on shaded area
    $('.nav-block').click(function () {
        $('#navbar-toggle').click();
    });
    $('.header-buttons-row .navbar-toggle').click(function() {
        var accessMargin = $('.header-accessibility').css('margin-left');
        var searchMargin = $('.header-search').css('margin-left');

        if(accessMargin != '0px' && searchMargin != '0px') {
            $('#navbar-toggle').click();
        } else {
            hideElement('.mobile-subitems-wrapper', false);
            hideElement('.menu-categories-wrapper', false);
            $('.menu-categories-wrapper').css('z-index', '350');
            showElement('.menu-categories-wrapper', true, function() {
                hideElement('.header-accessibility', false);
                hideElement('.header-search', false);
                $('.accessibility-button').removeClass('opened-menu');
                $('.search-button').removeClass('opened-menu');
                $('.menu-categories-wrapper').css({'z-index': '310'});
            });
        }
    });

    //Avoid menu closing on list elements click
    $('.mobile-menu-wrapper').click(function(e) {
        e.stopPropagation();
    });

    //Mobile menu dropdown control
    $('.mobile-menu-wrapper .main-category').click(function() {
        var targetEl = $(this).find('.mobile-subitems-wrapper');
        var parentEl = $(this).closest('.header-main-menu')[0];
        if(targetEl.length) {
            showElement(targetEl, true);
            $(parentEl).css('overflow-y', 'hidden');
        }
    });
    $('.opened-menu-item').click(function(e) {
        e.stopPropagation();
        var targetEl = $(e.currentTarget).closest('.mobile-subitems-wrapper')[0];
        var parentEl = $(e.currentTarget).closest('.header-main-menu')[0];
        hideElement(targetEl, true);
        $(parentEl).css('overflow-y', 'auto');
    });

    //Open accessibility menu from opened menu
    $('.accessibility-button').click(function() {
        if(!$(this).hasClass('opened-menu')) {
            hideElement('.header-search', false);
            showElement('.header-accessibility', true);
        } else {
            $('#navbar-toggle').click();
        }
        $(this).toggleClass('opened-menu');
        $('.search-button').removeClass('opened-menu');
    });

    //Open accessibility menu from header
    $('.accessibility-nav-button').click(function() {
        $('#navbar-toggle').click();
        if(!$('.accessibility-button').hasClass('opened-menu')) $('.accessibility-button').click();
    });

    //Open search menu from opened menu
    $('.search-button').click(function() {
        if(!$(this).hasClass('opened-menu')) {
            hideElement('.header-accessibility', false);
            showElement('.header-search', true);
        } else {
            $('#navbar-toggle').click();
        }
        $(this).toggleClass('opened-menu');
        $('.accessibility-button').removeClass('opened-menu');
    });

    //Open search menu from header
    $('.search-nav-button').click(function() {
        $('#navbar-toggle').click();
        if(!$('.search-button').hasClass('opened-menu')) $('.search-button').click();
    });



    /////////// ACCESSIBILITY CONTROL
    //Restore defaults
    $('.reset-default').click(function() {
        $('body').removeClass();
        $('body').addClass('default-font');
        setCookie();
    });

    //Font sizes control
    $('.font-button').click(function() {
        var arr = ['default-font', 'small-font', 'middle-font', 'big-font'];
        var userChoose = $(this).attr('data-target');

        arr.splice(arr.indexOf(userChoose), 1);

        $('body').addClass(userChoose);
        $('body').removeClass(arr.join(' '));
        setCookie();
    });

    //Underlined links
    $('.underlined-links').click(function() {
        $('body').toggleClass('underlined');
        setCookie();
    });

    //Contrast text
    $('.contrast-text').click(function() {
        $('body').toggleClass('contrasted');
        setCookie();
    });



    ///////// COOKIES CONTROL
    //Set cookie
    function setCookie() {
        var bodyClasses = $('body').attr('class');
        document.cookie = 'accessibility=' + encodeURI(bodyClasses);
    }

    //Get cookie
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    }
});