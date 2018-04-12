//===========PRELOADER=============//
var preload = $('.preload')[0];
preload.classList.add('show-preloader');
$(window).on('load', function () {
    setTimeout(function () {
        preload.classList.remove('show-preloader');
    }, 1000)
});

$(document).ready(function () {
    activeLinks();
    scrollArrow();

});

$(window).scroll(function () {
    activeScroll;
});


//========ACTIVE LINKS SWITCHING=======//
function activeLinks() {
    $("li").click(function () {
        if (!$(this).hasClass("active")) {
            $("li.active").removeClass("active");
            $(this).addClass("active");
        }
    });
}


function scrollArrow() {
    $('.cd-scroll-down').click(function () {
        goDown();
    });
}

//======PARALLAX EFFECT WITH SCROLL NAVIGATION=========//
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function wheelScroll(evt) {
    if (isFirefox) {
        //Set delta for Firefox
        delta = evt.detail * (-120);
    } else if (isIe) {
        //Set delta for IE
        delta = -evt.deltaY;
    } else {
        //Set delta for all other browsers
        delta = evt.wheelDelta;
    }
    if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
            goDown();
        }
        if (delta >= scrollSensitivitySetting) {
            goUp();
        }
    }
}

function touchScroll(ts, te) {
    delta = te - ts;
    if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
            goDown();
        }
        if (delta >= scrollSensitivitySetting) {
            goUp();
        }
    }
}

function goDown() {
    //Down scroll
    ticking = true;
    if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
    }
    slideDurationTimeout(slideDurationSetting);
}

function goUp() {
    //Up scroll
    ticking = true;
    if (currentSlideNumber !== 0) {
        currentSlideNumber--;
    }
    previousItem();
    slideDurationTimeout(slideDurationSetting);

}

//navigations trought the slides
function goto(slide) {
    //slide numbering is like array from 0 to total-1
    if (currentSlideNumber == 0) {
        if (slide == 1) {
            goDown();
        } else if (slide == 2) {
            for (var i = 0; i < 2; i++) {
                goDown();
            }
        } else if (slide == 3) {
            for (var i = 0; i < 3; i++) {
                goDown();
            }
        } else if (slide == 4) {
            for (var i = 0; i < 4; i++) {
                goDown();
            }
        }
    } else if (currentSlideNumber == 1) {
        if (slide == 0) {
            goUp();
        } else if (slide == 2) {
            goDown();
        } else if (slide == 3) {
            goDown();
        } else if (slide == 4) {
            for (var i = 0; i < 3; i++) {
                goDown();
            }
        }
    } else if (currentSlideNumber == 2) {
        if (slide == 0) {
            goUp();
            goUp();
        } else if (slide == 1) {
            goUp();
        } else if (slide == 3) {
            goDown();
        } else if (slide == 4) {
            for (var i = 0; i < 2; i++) {
                goDown();
            }
        }

    } else if (currentSlideNumber == 3) {
        if (slide == 0) {
            for (var i = 0; i < 3; i++) {
                goUp();
            }
        } else if (slide == 1) {
            for (var i = 0; i < 2; i++) {
                goUp();
            }
        } else if (slide == 2) {
            goUp();
        } else if (slide == 4) {
            goDown();
        }
    } else if (currentSlideNumber == 4) {
        if (slide == 0) {
            for (var i = 0; i < 4; i++) {
                goUp();
            }
        } else if (slide == 1) {
            for (var i = 0; i < 3; i++) {
                goUp();
            }
        } else if (slide == 2) {
            for (var i = 0; i < 2; i++) {
                goUp();
            }
        } else if (slide == 3) {
            goUp();
        }
    }
}
// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
    setTimeout(function () {
        ticking = false;
    }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
var ts;

window.addEventListener(mousewheelEvent, $.throttle(60, wheelScroll), false);
window.addEventListener("touchstart", function (e) {
    ts = e.touches[0].clientY;
}, false);
window.addEventListener("touchend", function (e) {
    var te = e.changedTouches[0].clientY;
    touchScroll(ts, te);
}, false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
    var $previousSlide = $(".background").eq(currentSlideNumber - 1);
    $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
    var $currentSlide = $(".background").eq(currentSlideNumber);
    $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}


function activeScroll() {
    var scrollPos = $(window).scrollTop();
    console.log(scrollPos);
}


//-----------------------TYPEWRITER EFFECT-------------------------//




// set up text to print, each item in array is new line
var aText = new Array(
    "&ltbody&gt",
    "<p>&lth1&gt</p>",
    "<h1>Hi,",
    "I'm Gregory,",
    "front end developer.</h1>",
    "<p>&lt/h1&gt</p>",
    "&lt/body&gt"
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination = document.getElementById("typedtext");
    


    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
    if (iTextPos++ == iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
}


typewriter();
