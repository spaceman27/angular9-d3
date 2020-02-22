import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedCoreModule } from '@secureworks-homeassignment/shared/core';
import { UiModule } from '@secureworks-homeassignment/ui';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedCoreModule,
    MaterialModule,
    ReactiveFormsModule,
    UiModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [

  ]
})
export class HomeModule { }
