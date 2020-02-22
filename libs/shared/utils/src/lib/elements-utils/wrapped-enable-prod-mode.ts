import { enableProdMode } from '@angular/core';

/**
 * enableProdMode() cannot be called more than once or Angular will throw.
 * This simple wrapper ensures it is only ever called once, no matter what order
 * the Angular elements load in on the page.
 */
(window as any).PROD_MODE_ENABLED = (window as any).PROD_MODE_ENABLED || false;
(window as any).enableProdMode =
  (window as any).enableProdMode ||
  function() {
    if ((window as any).PROD_MODE_ENABLED) {
      return;
    }
    enableProdMode();
    (window as any).PROD_MODE_ENABLED = true;
  };

export const wrappedEnableProdMode = (window as any).enableProdMode;
