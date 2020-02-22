import { BrowserModule, HammerModule  } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from './app.component';
import { NgZoneNgElementStrategyFactory } from '@secureworks-homeassignment/shared/utils';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiService } from '@secureworks-homeassignment/shared/core';
import { EnvironmentService, loadEnvironmentFactory } from './services/environment.service';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { ShellModule } from './shell/shell.module';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedCoreModule } from '@secureworks-homeassignment/shared/core';
import { UiModule } from '@secureworks-homeassignment/ui';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedCoreModule.forRoot(),
    UiModule,
    BrowserAnimationsModule,
    HammerModule,
    MaterialModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryWebApiService),
    ShellModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadEnvironmentFactory,
      deps: [EnvironmentService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


