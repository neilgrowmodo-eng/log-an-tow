(function () {
  const SQUEEZE_QUERY = window.matchMedia('(min-width: 990px)');

  /*
   * Menu label → section ID
   */
  const SECTION_MAP = {
    home: '#hero-section',
    about: '#about-section',
    services: '#services-section',
    gallery: '#gallery-section',
    'request a quote': '#contact-section'
  };


  /**
   * Find the actual navigation link from the click event,
   * even when the link exists inside a Shadow DOM.
   */
  function getMenuLinkFromEvent(event) {
    const path = event.composedPath();

    return path.find(function (node) {
      return (
        node instanceof Element &&
        node.matches('.menu-list__link')
      );
    });
  }


  /**
   * Get the visible menu title.
   */
  function getMenuTitle(link) {
    const title = link.querySelector('.menu-list__link-title');

    if (!title) return null;

    return title.textContent
      .trim()
      .toLowerCase();
  }


  /**
   * Match the theme's actual scrolling architecture.
   *
   * Desktop >= 990px:
   * .page-wrapper scrolls.
   *
   * Mobile < 990px:
   * document scrolls.
   */
  function getScrollContainer() {
    if (SQUEEZE_QUERY.matches) {
      return (
        document.querySelector('.page-wrapper') ||
        document.scrollingElement ||
        document.documentElement
      );
    }

    return (
      document.scrollingElement ||
      document.documentElement
    );
  }


  /**
   * Smooth-scroll to a section.
   */
  function scrollToSection(target) {
    /*
     * DESKTOP
     * .page-wrapper is the scroll container.
     */
    if (SQUEEZE_QUERY.matches) {
      const container = getScrollContainer();

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      /*
       * Respect CSS:
       *
       * scroll-margin-top: ...
       */
      const scrollMarginTop =
        parseFloat(
          window.getComputedStyle(target).scrollMarginTop
        ) || 0;

      const targetTop =
        container.scrollTop +
        targetRect.top -
        containerRect.top -
        scrollMarginTop;

      container.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      return;
    }


    /*
     * MOBILE
     * Native document scrolling.
     */
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }


  /**
   * Navigation click handler.
   *
   * Capture mode is intentional because the navigation
   * lives within the theme's Shadow DOM architecture.
   */
  document.addEventListener(
    'click',
    function (event) {
      const link = getMenuLinkFromEvent(event);

      if (!link) return;

      const menuTitle = getMenuTitle(link);

      if (!menuTitle) return;

      const targetSelector = SECTION_MAP[menuTitle];

      /*
       * Ignore links we don't manage,
       * such as the "More" button.
       */
      if (!targetSelector) return;

      const target = document.querySelector(targetSelector);

      if (!target) {
        console.warn(
          `[TL Navigation] Target not found: ${targetSelector}`
        );

        return;
      }


      /*
       * Stop href="#" from performing its native action.
       */
      event.preventDefault();


      /*
       * Scroll using the theme's correct scroll container.
       */
      scrollToSection(target);


      /*
       * Update URL without triggering another browser scroll.
       *
       * Example:
       * /#about-section
       */
      history.pushState(
        null,
        '',
        targetSelector
      );
    },
    true
  );
})();