$(document).ready(function () {
    var SEARCH_URL = '/search';
    var DOMAIN_URL = window.location.origin + '/';
    // var SEARCH_URL = '/search.html';


    //Remove current value of search input
    //If mobile - on second click close mobile menu
    $('.header-search-cancel').click(function() {
        var searchWrapperEl = $(this).closest('.header-search-wrapper')[0];
        var inputEl = $(searchWrapperEl).find('.header-search-input');
        if($(inputEl).val() == '' && $(searchWrapperEl).closest('.mobile-menu-wrapper')) {
            $('#navbar-toggle').click();
        } else {
            $('.header-search-input').val('');
            $('.site-search .header-search-input').typeahead('val', '');
        }
    });


    //Action on enter press in search input
    //If IOS safari do same when input was left
    $('.header-search-input').bind('keypress', function(e) {
       if(e.which === 13) {
           if($(this).val() != '' && !$(this).siblings('.tt-menu').find('.empty-message').length) {
               localStorage.setItem('search', JSON.stringify(window.searchResults));
               window.location = SEARCH_URL + '?' +$(this).val();
           }
       }
    });
    if(window.mobileSafari) {
        $('.header-search-input').focusout(function() {
            if($(this).val() != '' && !$(this).siblings('.tt-menu').find('.empty-message').length) {
                localStorage.setItem('search', JSON.stringify(window.searchResults));
                window.location = SEARCH_URL + '?' +$(this).val();
            }
        })
    }

    //Resize suggestion block when keyboard appeared on mobile
    $('.mobile-menu-wrapper .header-search-input').focus(function() {
        $(this).siblings('.tt-menu').addClass('opened-keyboard');
    });
    $('.mobile-menu-wrapper .header-search-input').blur(function() {
        $(this).siblings('.tt-menu').removeClass('opened-keyboard');
    });


    //Bloodhound declaration
    var articles = new Bloodhound({
        datumTokenizer: function(datum) {
            var x = Bloodhound.tokenizers.whitespace(datum.title);
            var y = Bloodhound.tokenizers.whitespace( datum.description);
            var z = [], w = [];

            if(datum.h2.length) {
                for(var i = 0; i < datum.h2.length; i++) {
                    var result = datum.h2[i];
                    if(result.indexOf('/') != -1) {
                        var last = result.indexOf(']');
                        result = result.substring(1, last);
                    }
                    var t = Bloodhound.tokenizers.whitespace(result);
                    z.push.apply(z, t);
                }
            }

            if(datum.h3.length) {
                for(i = 0; i < datum.h3.length; i++) {
                    result = datum.h3[i];
                    if(result.indexOf('/') != -1) {
                        last = result.indexOf(']');
                        result = result.substring(1, last);
                    }
                    t = Bloodhound.tokenizers.whitespace(result);
                    w.push.apply(w, t);
                }
            }
            return x.concat(y).concat(z).concat(w);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        sorter: function(a, b) {
            if(a.priority > b.priority) return -1;
            else if(a.priority < b.priority) return 1;
            else {
                if(a.occurences > b.occurences) return -1;
                else if(a.occurences < b.occurences) return 1;
                else return 0;
            }
        },
        prefetch: {
            url: '../data-search.json',
            cache: false,
            filter: function(data) {
                // console.log(data.slice(0,10));
                return data;
            }
        }
    });
    articles.initialize();


    //Typeahead declaration
    $('.site-search .header-search-input').typeahead({
            hint: false,
            highlight: true,
            minLength: 1
        },
        {
            name: 'articles',
            source: articles.ttAdapter(),
            display: 'title',
            limit: 10,
            templates: {
                empty: [
                    '<div class="empty-message">',
                    'לא נמצאו תוצאות.  אנא נסו ביטוי אחר',
                    '</div>'
                ].join('\n'),
                suggestion: function(data) {
                    return '<div><a class="search-url-item" href="' + DOMAIN_URL + data.permalink + '">' + data.title + '</a></div>';
                }
            }
        }
    );


    //Action on search page
    if (window.location.pathname == SEARCH_URL) {
        var searchResults = localStorage.getItem('search');
        searchResults = JSON.parse(searchResults);

        $('.user-search-input').html(decodeURI(window.location.search.substring(1)));

        var breakpoint = 10;
        if (searchResults.length < 10) breakpoint = searchResults.length;

        var result = '';
        for (var i = 0; i < breakpoint; i++) {
            result += addSearchElement(searchResults[i]);
        }
        $('.search-search').append($.parseHTML(result));

        //Chrome hack to render elements (append issue)
        $(window).scrollTop(1);
        $(window).scrollTop(0);
    }


    function addSearchElement(elem) {
        return '<div class="search-element-row"><a class="search-page-link" href="' + DOMAIN_URL + elem.permalink + '">' + elem.title + '</a><p class="search-page-desc">' + elem.description + '</p></div>';
    }
});


