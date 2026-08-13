(function () {

  /* ============================================================
     BEFORE / AFTER COMPONENT
     ============================================================ */

  function initBeforeAfter(scope = document) {

    const comparisons = scope.querySelectorAll(
      '[data-tl-before-after]:not([data-tl-before-after-initialized])'
    );


    comparisons.forEach(function (comparison) {

      const range = comparison.querySelector(
        '[data-tl-before-after-range]'
      );


      if (!range) return;


      function updateComparison() {

        comparison.style.setProperty(
          '--tl-comparison-position',
          `${range.value}%`
        );

      }


      range.addEventListener(
        'input',
        updateComparison
      );


      updateComparison();


      comparison.setAttribute(
        'data-tl-before-after-initialized',
        ''
      );

    });

  }


  /* ============================================================
     SPLIDE
     ============================================================ */

  function initMarineSliders(scope = document) {

    if (!window.Splide) {

      console.warn(
        '[TL Marine Slider] Splide library is not loaded.'
      );

      return;

    }


    const sliders = scope.querySelectorAll(
      '[data-tl-marine-slider]:not(.is-initialized)'
    );


    sliders.forEach(function (slider) {

      const splide = new window.Splide(
        slider,
        {
          type: 'slide',

          start: 0,

          /*
           * This creates the Figma-style
           * neighboring slide preview.
           */
          fixedWidth: '82%',

          gap: '12px',

          focus: 'center',

          trimSpace: false,

          perMove: 1,

          speed: 700,

          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',

          drag: true,

          /*
           * Do not let Splide steal dragging
           * from our comparison slider.
           */
          noDrag: '.tl-before-after__range',

          arrows: true,

          pagination: true,

          keyboard: 'global',

          breakpoints: {

            1024: {
              fixedWidth: '86%',
              gap: '10px'
            },

            767: {
              fixedWidth: '90%',
              gap: '8px'
            }

          }
        }
      );


      splide.mount();

    });

  }


  /* ============================================================
     INITIALIZE
     ============================================================ */

  function init(scope = document) {

    initBeforeAfter(scope);

    initMarineSliders(scope);

  }


  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      function () {
        init();
      },
      { once: true }
    );

  } else {

    init();

  }


  /* ============================================================
     SHOPIFY THEME EDITOR
     ============================================================ */

  document.addEventListener(
    'shopify:section:load',
    function (event) {

      init(event.target);

    }
  );

})();