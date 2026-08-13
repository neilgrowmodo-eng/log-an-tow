(function () {
  const SQUEEZE_QUERY = window.matchMedia('(min-width: 990px)');

  let observer = null;

  /**
   * Returns the correct IntersectionObserver root
   * based on the theme's scroll architecture.
   *
   * Desktop >= 990px:
   * .page-wrapper is the scroll container.
   *
   * Mobile < 990px:
   * null = browser viewport.
   */
  function getIntersectionRoot() {
    if (SQUEEZE_QUERY.matches) {
      return document.querySelector('.page-wrapper') || null;
    }

    return null;
  }


  /**
   * Apply the global defaults normally added by AOS.init().
   *
   * AOS CSS uses these attributes when determining
   * duration, delay, and easing.
   */
  function setAOSDefaults() {
    document.body.setAttribute('data-aos-easing', 'ease-out-cubic');
    document.body.setAttribute('data-aos-duration', '800');
    document.body.setAttribute('data-aos-delay', '0');
  }


  /**
   * Handles an element entering the active viewport.
   */
  function handleIntersection(entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('aos-animate');

      /*
       * Equivalent to:
       *
       * AOS.init({
       *   once: true
       * });
       */
      observer.unobserve(entry.target);
    });
  }


  /**
   * Creates our observer using the theme's
   * actual scrolling viewport.
   */
  function createObserver() {
    if (observer) {
      observer.disconnect();
    }

    observer = new IntersectionObserver(
      handleIntersection,
      {
        root: getIntersectionRoot(),

        /*
         * Similar to AOS offset: 80.
         *
         * The animation triggers when the element
         * has entered approximately 80px into
         * the viewport.
         */
        rootMargin: '0px 0px -80px 0px',

        threshold: 0
      }
    );
  }


  /**
   * Find and register any AOS elements
   * that haven't been initialized yet.
   */
  function registerElements(scope = document) {
    if (!observer) return;

    const elements = scope.querySelectorAll(
      '[data-aos]:not(.aos-init)'
    );

    elements.forEach(function (element) {
      /*
       * Ignore invalid / disabled animation values.
       */
      if (
        !element.dataset.aos ||
        element.dataset.aos === 'none'
      ) {
        return;
      }

      element.classList.add('aos-init');

      observer.observe(element);
    });
  }


  /**
   * Initialize animations.
   */
  function initAOS() {
    setAOSDefaults();

    createObserver();

    registerElements();
  }


  /**
   * Reinitialize when crossing the theme's
   * 990px desktop/mobile breakpoint.
   *
   * IntersectionObserver's root cannot be changed
   * after creation, so a new observer is required.
   */
  function handleBreakpointChange() {
    createObserver();

    /*
     * Existing .aos-init elements need to be
     * registered with the new observer.
     */
    document.querySelectorAll(
      '[data-aos].aos-init:not(.aos-animate)'
    ).forEach(function (element) {
      observer.observe(element);
    });

    registerElements();
  }


  /* ==========================================================
     INITIAL LOAD
     ========================================================== */

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      initAOS,
      { once: true }
    );
  } else {
    initAOS();
  }


  /* ==========================================================
     RESPONSIVE SCROLL ROOT
     ========================================================== */

  SQUEEZE_QUERY.addEventListener(
    'change',
    handleBreakpointChange
  );


  /* ==========================================================
     SHOPIFY THEME EDITOR
     ========================================================== */

  document.addEventListener(
    'shopify:section:load',
    function (event) {
      registerElements(event.target);
    }
  );


  document.addEventListener(
    'shopify:block:select',
    function (event) {
      registerElements(event.target);

      /*
       * Selected blocks should remain visible
       * while editing.
       */
      event.target
        .querySelectorAll('[data-aos]')
        .forEach(function (element) {
          element.classList.add('aos-animate');
        });
    }
  );
})();