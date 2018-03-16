import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { ExploreModule } from './explore/explore.module';
import { BoxesModule } from './boxes/boxes.module';
import { AboutModule } from './about/about.module';
import { ForSaleModule } from './forsale/forsale.module';
import { DenModule } from './den/den.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { MarketplaceAppComponent } from './marketplace_app.component';
import { MarketplaceAppRoutingModule } from './marketplace_app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    NgbModule.forRoot(),
    CoreModule,
    SharedModule,
    ExploreModule,
    BoxesModule,
    AboutModule,
    ForSaleModule,
    DenModule,
    LoginModule,
    RegisterModule,
    MarketplaceAppRoutingModule
  ],
  declarations: [
    MarketplaceAppComponent
  ],
  providers: [
  ],
  entryComponents: [
  ],
  exports: [
    MarketplaceAppComponent
  ],
  bootstrap: [MarketplaceAppComponent]
})
export class MarketplaceAppModule { }
