(() => {
  const STYLE_ID = 'tl-shopify-form-layout';

  const CSS = `
    /* ==============================
      TWO COLUMN FORM LAYOUT
      ============================== */

    form[data-testid="form"] {
      display: grid !important;
      grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
      column-gap: 24px !important;
    }

    form[data-testid="form"] > * {
      grid-column: 1 / -1 !important;
    }

    /* ==============================
      ROW 1: 50 / 50
      ============================== */

    form[data-testid="form"] > div:has(#first_name) {
      grid-column: span 6 !important;
      min-width: 0 !important;
    }

    form[data-testid="form"] > div:has(#email) {
      grid-column: span 6 !important;
      min-width: 0 !important;
    }


    /* ==============================
      ROW 2: 30 / 70-ish
      ============================== */

    form[data-testid="form"] > div:has(#custom\\#company) {
      grid-column: span 4 !important;
      min-width: 0 !important;
    }

    form[data-testid="form"] > div:has(#phone_number) {
      grid-column: span 8 !important;
      min-width: 0 !important;
    }


    /* ==============================
      INPUTS
      ============================== */

    form[data-testid="form"] input:not([type="file"]),
    form[data-testid="form"] textarea {
      border: none !important;

      border-bottom:
        1px solid rgba(22, 77, 60, 0.4) !important;

      border-radius: 0 !important;

      box-shadow: none !important;
      outline: none !important;

      background: transparent !important;
    }

    form[data-testid="form"] input:not([type="file"]):focus,
    form[data-testid="form"] textarea:focus {
      border: none !important;

      border-bottom:
        1px solid #164D3C !important;

      border-radius: 0 !important;

      box-shadow: none !important;
      outline: none !important;
    }


    /* ==============================
      TEXTAREA BACKGROUND FIX
      ============================== */

    ._formFieldContainer_1mxsl_5:has(textarea)::before {
      background-color: transparent !important;
    }


    /* ==============================
      MOBILE
      ============================== */

    @media screen and (max-width: 749px) {

      form[data-testid="form"] {
        grid-template-columns: 1fr !important;
      }

      form[data-testid="form"] > div:has(#first_name),
      form[data-testid="form"] > div:has(#email),
      form[data-testid="form"] > div:has(#custom\\#company),
      form[data-testid="form"] > div:has(#phone_number) {
        grid-column: 1 / -1 !important;
      }

    }
  `;



  function injectStyles(root) {
    if (!root) return;

    const form = root.querySelector?.(
      'form[data-testid="form"]'
    );

    if (form) {
      const shadowRoot = form.getRootNode();

      if (
        shadowRoot instanceof ShadowRoot &&
        !shadowRoot.querySelector(`#${STYLE_ID}`)
      ) {
        const style = document.createElement('style');

        style.id = STYLE_ID;
        style.textContent = CSS;

        shadowRoot.appendChild(style);
      }
    }


    const elements =
      root.querySelectorAll?.('*') || [];

    elements.forEach((element) => {
      if (element.shadowRoot) {
        injectStyles(element.shadowRoot);
      }
    });
  }


  function init() {
    injectStyles(document);

    const observer = new MutationObserver(() => {
      injectStyles(document);
    });

    observer.observe(
      document.documentElement,
      {
        childList: true,
        subtree: true
      }
    );
  }


  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      init
    );
  } else {
    init();
  }
})();

(() => {
  const STYLE_ID = 'tl-shopify-form-max-width-fix';

  const CSS = `
    section[data-sizing="form-wrapper"][role="dialog"] {
      max-width: unset !important;
    }
  `;

  function injectStyles(root) {
    if (!root) return;

    const target = root.querySelector?.(
      'section[data-sizing="form-wrapper"][role="dialog"]'
    );

    if (target) {
      const shadowRoot = target.getRootNode();

      if (
        shadowRoot instanceof ShadowRoot &&
        !shadowRoot.querySelector(`#${STYLE_ID}`)
      ) {
        const style = document.createElement('style');

        style.id = STYLE_ID;
        style.textContent = CSS;

        shadowRoot.appendChild(style);
      }
    }

    const elements = root.querySelectorAll?.('*') || [];

    elements.forEach((element) => {
      if (element.shadowRoot) {
        injectStyles(element.shadowRoot);
      }
    });
  }

  function init() {
    injectStyles(document);

    const observer = new MutationObserver(() => {
      injectStyles(document);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
