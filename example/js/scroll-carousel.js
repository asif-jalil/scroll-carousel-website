// import { ScrollCarousel } from './dist/scroll.carousel';
(function () {
  let demo1 = document.querySelector('#demo1');
  let demo2 = document.querySelector('#demo2');
  let demo3 = document.querySelector('#demo3');

  new ScrollCarousel(demo1);
  new ScrollCarousel(demo2, {
    smartSpeed: true,
    speed: 9
  });

  new ScrollCarousel(demo3);
})();
