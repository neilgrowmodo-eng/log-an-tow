(function () {
  function initSplide(scope = document) {
    if (typeof window.Splide === 'undefined') {
      console.warn('[TL Splide] Splide library is not loaded.');
      return;
    }

    const sliders = scope.querySelectorAll(
      '.tl-splide:not(.is-initialized)'
    );

    sliders.forEach(function (slider) {
      new window.Splide(slider).mount();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      function () {
        initSplide();
      },
      { once: true }
    );
  } else {
    initSplide();
  }

  /*
   * Shopify Theme Editor:
   * initialize sliders inside dynamically reloaded sections.
   */
  document.addEventListener(
    'shopify:section:load',
    function (event) {
      initSplide(event.target);
    }
  );
})();