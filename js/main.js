//===========PRELOADER=============//
var preload = $('.preload')[0];
preload.classList.add('show-preloader');
$(window).on('load', function () {
    setTimeout(function () {
        preload.classList.remove('show-preloader');
    }, 1000)
});

$(document).ready(function () {
    clickLinksActive();
    typewriter();
});

//======PARALLAX EFFECT WITH SCROLL NAVIGATION=========//
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- determine delta/scroll direction------------- //
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
        scrollLinksActive();
        fadingElements();
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
    scrollLinksActive();
    fadingElements();
    slideDurationTimeout(slideDurationSetting);
}


//-----------navigations trought the slides------------//
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
            for (var i = 0; i < 2; i++) {
                goUp();
            }
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

// ------------- set timeout to temporatily "lock" slides------------- //
function slideDurationTimeout(slideDuration) {
    setTimeout(function () {
        ticking = false;
    }, slideDuration);
}

// ------------- add event listener ------------- //
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

// ------------- slide motion ------------- //
function nextItem() {
    var previousSlide = $(".background").eq(currentSlideNumber - 1);
    previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
    var currentSlide = $(".background").eq(currentSlideNumber);
    currentSlide.removeClass("down-scroll").addClass("up-scroll");
}

//========ADD CLASS ACTIVE TO NAV - SCROLL & CLICK=======//
function clickLinksActive() {
    $("li").click(function () {
        if (!$(this).hasClass("active")) {
            $("li.active").removeClass("active");
            $(this).addClass("active");
        }
    });
}

function scrollLinksActive() {
    var currentLink = $('li').eq(currentSlideNumber);
    currentLink.addClass('active');
    currentLink.siblings().removeClass('active');
}


//============MENU TOOGLE FOR MOBILE DEVICES===========//

$(".menu-toggle").on('click', function () {
    $(this).toggleClass("on");
    $('.menu-section').toggleClass("on");
    $("nav ul").toggleClass('hidden');
});

$('li').on('click', function() {
    $('.menu-toggle').toggleClass("on");
    $('ul').toggleClass('hidden');
});

//============FADING (HIDE/SHOW) ELEMENTS=========// 

function fadingElements() {
    var skills = $('.skills-boxes');
    var projects = $('.projects-boxes');
    if (currentSlideNumber !== 2) {
        skills.stop().fadeOut();
    } else {
        skills.stop().fadeIn(2000);
    }

    if (currentSlideNumber !== 3) {
        projects.stop().fadeOut();
    } else {
        projects.stop().fadeIn(2000);
    }
}

//====================TYPEWRITER EFFECT======================//
var Text = new Array(
    "<p></p><p></p>",
    "<p>&ltbody&gt</p>",
    "<h3>&lth1&gt</h3>",
    "<h1>Hej,",
    "Jestem Grzegorz,",
    "front end developer.</h1>",
    "<h3>&lt/h1&gt</h3>",
    "<p>&lt/body&gt</p>"
);
var Speed = 65; // time delay of print out
var Index = 0; // start printing array at this posision
var ArrLength = Text[0].length; // the length of the text array
var ScrollAt = 20; // start scrolling up at this many lines

var TextPos = 0; // initialise text position
var Contents = ''; // initialise contents variable
var Row; // initialise current row

function typewriter() {
    Contents = ' ';
    Row = Math.max(0, Index - ScrollAt);
    var destination = $("#typedtext");



    while (Row < Index) {
        Contents += Text[Row++] + '<br />';
    }
    destination.html(Contents + Text[Index].substring(0, TextPos) + "<span>_</span>");
    if (TextPos++ == ArrLength) {
        TextPos = 0;
        Index++;
        if (Index != Text.length) {
            ArrLength = Text[Index].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", Speed);
    }
}


//================GOOGLE MAPS API=================//
function initMap() {
    var uluru = {
        lat: 50.06465009999999,
        lng: 19.94497990000002
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
