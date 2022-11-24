import Clipboard from 'clipboard';
import highlightjsInit from './highlight';
import tooltipInit from './tooltip';

// Get Document ready
const docReady = fn => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};

const scrollCarouselInit = () => {
  new ScrollCarousel('.basic__example-carousel');

  new ScrollCarousel('.speed__example-carousel', {
    speed: 8,
    smartSpeed: true
  });
  new ScrollCarousel('.autoplay__example-carousel', {
    autoplay: true
  });
  const destroyExampleCarousel = new ScrollCarousel('.destroy__example-carousel', {
    speed: 8,
    smartSpeed: true,
    autoplay: true
  });
  document.querySelector('#destroy-button').addEventListener('click', function () {
    destroyExampleCarousel.destroy();
  });
};

const clipboardInit = () => new Clipboard('[data-clipboard-text]');

docReady(scrollCarouselInit);
docReady(highlightjsInit);
docReady(tooltipInit);
docReady(clipboardInit);

