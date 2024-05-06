"use strict";
console.log('ddd');
document.addEventListener('DOMContentLoaded', function() {
  console.log('ddd');
  const resizableSwiper = (breakpoint, swiperClass, swiperSettings) => {
    let swiper;

    const enableSwiper = function(className, settings) {
      swiper = new Swiper(className, settings);
    }

    breakpoint = window.matchMedia(breakpoint);

    const checker = function() {
      if (breakpoint.matches) {

        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener('change', checker);
    checker();
  }


  resizableSwiper(
    '(max-width: 480px)',
    '.b-nav-slider__container',
    {
      spaceBetween: 6,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
    },
  );
});
