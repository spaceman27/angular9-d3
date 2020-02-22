import { Injector } from '@angular/core';

export function resolveSharedInjector(): Injector {
  if (!(window as any).__EASE_SHARED_CONTEXT__ || !(window as any).__EASE_SHARED_CONTEXT__.injector) {
    throw new Error('No available Injector for the Element');
  }
  return (window as any).__EASE_SHARED_CONTEXT__.injector as Injector;
}
