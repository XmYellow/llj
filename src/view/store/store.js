import Swiper from 'swiper';
import {WOW} from 'wowjs'
new WOW().init();

const activeDom = document.getElementById('store');
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
