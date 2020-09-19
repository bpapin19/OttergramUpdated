var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var BUTTON_SELECTOR_PREV = '[data-image-role="button1"]';
var BUTTON_SELECTOR_NEXT = '[data-image-role="button2"]';
var DETAIL_FRAME_SELECTOR = '[date-image-role="frame"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var i = 0;

function setDetails(imageURL, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function showDetails() {  
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function imageFromThumb(thumbnail) {  
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {  
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {  
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getPrev(){
    'use strict';
    var thumbnails = getThumbnailsArray();
    var button1 = document.querySelector(BUTTON_SELECTOR_PREV);
    button1.addEventListener("click", function(event){
        event.preventDefault();
        if (i != 0){
            i--;
            var thumbnail = thumbnails[i];
            setDetailsFromThumb(thumbnail);
        } else {
            console.error("Cannot go to previous");
        }
    });
}

function getNext(){
    'use strict';
    var thumbnails = getThumbnailsArray();
    var button1 = document.querySelector(BUTTON_SELECTOR_NEXT);
    button1.addEventListener("click", function(event){
        event.preventDefault();
        if (i != thumbnails.length-1){
            i++;
            var thumbnail = thumbnails[i];
            setDetailsFromThumb(thumbnail);
        } else {
            console.error("Cannot go to next");
        }
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);

}

function addKeyPressHandler() {
    document.body.addEventListener("keyup", function() {
        event.preventDefault();
        if (event.keyCode === ESC_KEY){
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    
    addKeyPressHandler();
    getPrev();
    getNext();
}

initializeEvents();