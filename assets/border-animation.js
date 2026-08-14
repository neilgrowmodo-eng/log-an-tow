(() => {
  const borderElements = document.querySelectorAll('.bdr-scroll');

  if (!borderElements.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-inview');

        /*
         * Animate only once.
         */
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  borderElements.forEach((element) => {
    observer.observe(element);
  });
})();