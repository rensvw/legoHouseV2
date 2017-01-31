import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {SettingsService} from './services/settings/settings.service'
import 'hammerjs';

// Components
import { ApiService } from './services/api/api.service';

// Routing
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
  ],
  imports: [
    FlexLayoutModule.forRoot(),
    MaterialModule.forRoot(),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
  ],
  providers: [
    ApiService,
    SettingsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
