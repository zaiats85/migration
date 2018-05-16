$(document).ready(function () {
    var postPageImages = $('.images-start-point img:not([class])');
    var galleryPageImages = $('.block .grid-element-image');
    var galleryImages = [], bigImagesArray = [], currentIndex, currentBig;

    //Bind show Modal to each post page image
    if (postPageImages) {
        postPageImages.each(function (index, el) {
            $(el).click(function () {
                openModalImage(index, postPageImages, 'postPageImages', 'src');
            });
        });
    }

    //Bind show Modal to each gallery page image
    if (galleryPageImages.length) {
        galleryPageImages.each(function (index, el) {
            $(el).click(function () {
                openModalImage(index, galleryPageImages, 'galleryPageImages', 'src');
            });
        });
    }


    //Open gallery button
    $('.open-gallery').click(function (e) {
        e.preventDefault();
        var source = $(this).attr('href');
        $.get(source, function (data) {
            var newData = data.replace(/src=/g,'nosrc=');
            galleryImages = $(newData).find('.grid-element-image');
            galleryImages.each(function (index, el) {
                $(el).click(function () {
                    openModalImage(index, galleryImages, source, 'nosrc');
                });
            });
            galleryImages[0].click();
        });
    });

    ////////////////    MODAL CONTROL   ////////////////////
    //Close modal events
    $('.images-modal').click(function () {
        hideModal();
    });
    $('.close-modal-button').click(function () {
        hideModal();
    });

    //stop Propagation to prevent modal close
    $('.images-modal-content').click(function (e) {
        e.stopPropagation();
    });

    //Left/Right control
    $('.images-modal .prev').click(function (e) {
        e.stopPropagation();
        anotherSlide(1);
    });
    $('.images-modal .next').click(function (e) {
        e.stopPropagation();
        anotherSlide(-1);
    });
    //Keyboard controll
    $(window).keydown(function(event) {
       switch(event.which) {
           case 39:
               anotherSlide(1);
               break;
           case 37:
               anotherSlide(-1);
               break;
           case 27:
               hideModal();
               break;
           default:
               break;
       }
    });
    if ($(window).width() < 600) {
        $('.images-modal').hammer().bind('swipeleft', function (e) {
            e.preventDefault();
            anotherSlide(1);
        });
        $('.images-modal').hammer().bind('swiperight', function (e) {
            e.preventDefault();
            anotherSlide(-1);
        });
    }


    function openModalImage(index, array, target, attribute) {
        var src = $(array[index]).attr(attribute);
        src = src.slice(0, src.lastIndexOf('.')) + '-big' + src.slice(src.lastIndexOf('.'));
        // src = src.slice(0, src.indexOf('-small')) + src.slice(src.lastIndexOf('.'));

        if (imageExists(src)) {
            $('.image-modal-element').attr('src', src);
            if (array[index].title) {
                $('.image-modal-caption').text(array[index].title);
            } else {
                $('.image-modal-caption').text('');
            }

            hideModal();
            showModal('.image-view-modal');

            if (currentBig !== target) {
                setTimeout(function() {
                    buildBigImagesArray(src, array, attribute);
                    currentBig = target;
                }, 1000);
            }
        }
    }

    function buildBigImagesArray(current, array, attribute) {
        bigImagesArray.length = 0;
        for (var i = 0; i < array.length; i++) {
            var src = $(array[i]).attr(attribute);
            src = src.slice(0, src.lastIndexOf('.')) + '-big' + src.slice(src.lastIndexOf('.'));
            // src = src.slice(0, src.indexOf('-small')) + src.slice(src.lastIndexOf('.'));

            if(current == src) {
                bigImagesArray.push({src: src, title: array[i].title});
            }
            else if (imageExists(src)) {
                bigImagesArray.push({src: src, title: array[i].title});
            }
        }
        currentIndex = indexofObject(current, bigImagesArray);
        anotherSlide(0);
    }

    function indexofObject(src, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].src === src) return i;
        }
        return -1;
    }

    //Simple check if image exist without loading it
    function imageExists(image_url) {
        var http = new XMLHttpRequest();

        http.open('HEAD', image_url, false);
        http.send();

        return http.status != 404;
    }


    //Hide/Show modal
    function showModal(el) {
        $(el).show();
        $('body').addClass('no-scroll');
    }

    function hideModal() {
        $('.images-modal').hide();
        $('body').removeClass('no-scroll');
    }

    //Set slide function
    function setSlide(iterator) {
        $('.image-modal-element').attr('src', bigImagesArray[iterator].src);
        if (bigImagesArray[iterator].title) {
            $('.image-modal-caption').text(bigImagesArray[iterator].title);
        } else {
            $('.image-modal-caption').text('');
        }
        currentIndex = iterator;
    }

    //Set lazy loading images
    function setLazy(prevIndex, nextIndex) {
        if(bigImagesArray[prevIndex]) {
            $('.lazy-image-before').attr('src', bigImagesArray[prevIndex].src);
        }
        if(bigImagesArray[nextIndex]) {
            $('.lazy-image-after').attr('src', bigImagesArray[nextIndex].src);
        }
    }

    //Change image function
    function anotherSlide(change) {
        var target = currentIndex + change,
            prevIndex = target - 1,
            nextIndex = target + 1;

        if (target >= bigImagesArray.length) {
            target = 0;
            prevIndex = bigImagesArray.length - 1;
            nextIndex = target + 1
        }
        else if (target < 0) {
            target = bigImagesArray.length - 1;
            prevIndex = target - 1;
            nextIndex = 0;
        }
        else if(target == 0) {
            prevIndex = bigImagesArray.length - 1;
            nextIndex = target + 1;
        }
        else if(target == bigImagesArray.length - 1) {
            prevIndex = target - 1;
            nextIndex = 0;
        }

        setSlide(target);
        setLazy(prevIndex, nextIndex);
    }
});