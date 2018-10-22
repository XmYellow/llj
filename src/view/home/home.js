import Swiper from 'swiper';
import "@babel/polyfill";

import {WOW} from 'wowjs'

new WOW().init();

const activeDom = document.getElementById('about');
activeDom.classList.add('active');
new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    autoplay: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});

function goTo(target) {
    var scrollT = document.body.scrollTop || document.documentElement.scrollTop
    if (scrollT > target) {
        var timer = setInterval(function () {
            var scrollT = document.body.scrollTop || document.documentElement.scrollTop
            var step = Math.floor(-scrollT / 6);
            document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
            if (scrollT <= target) {
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearTimeout(timer);
            }
        }, 20)
    } else if (scrollT == 0) {
        var timer = setInterval(function () {
            var scrollT = document.body.scrollTop || document.documentElement.scrollTop
            var step = Math.floor(300 / 3 * 0.7);
            document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
            console.log(scrollT)
            if (scrollT >= target) {
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearTimeout(timer);
            }
        }, 20)
    } else if (scrollT < target) {
        var timer = setInterval(function () {
            var scrollT = document.body.scrollTop || document.documentElement.scrollTop
            var step = Math.floor(scrollT / 6);
            document.documentElement.scrollTop = document.body.scrollTop = step + scrollT;
            if (scrollT >= target) {
                document.body.scrollTop = document.documentElement.scrollTop = target;
                clearTimeout(timer);
            }
        }, 20)
    } else if (target == scrollT) {
        return false;
    }
};

function getElementTop(elem) {
    var elemTop = elem.offsetTop;
    elem = elem.offsetParent;
    while (elem != null) {
        elemTop += elem.offsetTop;
        elem = elem.offsetParent;
    }
    return elemTop;
}

const btns = {
    'toP': 'isB', 'toB': 'isB', 'toT': 'isT', 'toE': 'isE', 'toTop': 0
};
Object.keys(btns).forEach(function (key) {
    document.getElementById(key).addEventListener('click', function () {
        if (!btns[key]) return goto(0);
        const top = getElementTop(document.getElementById(btns[key]));
        goto(top)
    }, false)
});
const scrollBox = document.getElementById('scrollBox');
window.addEventListener('scroll', function () {
    const scrollT = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollT < 742) {
        scrollBox.style.cssText = 'display:none';
        return
    }
    scrollBox.style.cssText = 'display:block';
}, false);

const moreBtn = document.getElementById('more-btn');
const more = document.getElementById('more');
moreBtn.addEventListener('click', function () {
    more.style.cssText = 'height: auto;';
    moreBtn.style.display = 'none'
}, false);
