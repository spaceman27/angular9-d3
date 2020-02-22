import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';
import { NgZoneNgElementStrategyFactory } from '../../../shared/utils/src/lib/elements-utils/ng-zone-ng-element-strategy-factory';

@NgModule({
  imports: [CommonModule],
  declarations: [DataVisualizationComponent],
  exports: [
    DataVisualizationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UiModule {
  static readonly CUSTOME_ELEMENTS = [
    {
      angularComponent: DataVisualizationComponent,
      customELementSelector: 'webcomponent-mutual-friend-d3'
    }
  ];
  
  constructor(shareInjector: Injector) {
    UiModule.CUSTOME_ELEMENTS.forEach(componentConfig => {
      const ngZoneElementFactory = new NgZoneNgElementStrategyFactory(componentConfig.angularComponent, shareInjector)
      customElements.define(componentConfig.customELementSelector,
        createCustomElement(componentConfig.angularComponent, {
          injector: shareInjector,
          strategyFactory: ngZoneElementFactory
        })
        );
    })
  }
}
