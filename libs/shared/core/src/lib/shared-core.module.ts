import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './services/api-service/api-service';

@NgModule({
  imports: [CommonModule]
})
export class SharedCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedCoreModule,
      providers: [
        ApiService
      ]
    };
  }
}
