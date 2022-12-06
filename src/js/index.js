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

  new ScrollCarousel('.autoplay__example-carousel', {
    autoplay: true
  });
  new ScrollCarousel('.direction__example-carousel', {
    smartSpeed: true,
    direction: 'ltr',
    autoplay: true
  });
  new ScrollCarousel('.slideSelector__example-carousel', {
    slideSelector: '.slide__item'
  });
  let triggerExampleCarousel = new ScrollCarousel('.trigger__example-carousel', {
    speed: 8,
    smartSpeed: true,
    autoplay: true
  });
  document.querySelector('#trigger-button').addEventListener('click', function () {
    if (triggerExampleCarousel.isActive) {
      triggerExampleCarousel.destroy();
    } else {
      triggerExampleCarousel = triggerExampleCarousel.reinit();
    }
  });
  let eventScrollCarousel = new ScrollCarousel('.events__example-carousel', {
    speed: 8,
    autoplay: true,
    smartSpeed: true,
    on: {
      destroy: function () {
        alert('Destroyed');
      },
      scroll: function (progress) {
        progressBar.style = `width: ${Math.ceil(progress)}%`;
        progressAmount.innerText = `${Math.ceil(progress)}%`;
      }
    }
  });

  document.querySelector('#destroy-button').addEventListener('click', function () {
    if (eventScrollCarousel.isActive) {
      eventScrollCarousel.destroy();
    } else {
      eventScrollCarousel = eventScrollCarousel.reinit();
    }
  });

  const progressBar = document.querySelector('.progress-bar');
  const progressAmount = document.querySelector('.progress');
};

const clipboardInit = () => new Clipboard('[data-clipboard-text]');

docReady(scrollCarouselInit);
docReady(highlightjsInit);
docReady(tooltipInit);
docReady(clipboardInit);
