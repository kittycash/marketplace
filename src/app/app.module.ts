import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ExploreModule } from './explore/explore.module';
import { BoxesModule } from './boxes/boxes.module';
import { AboutModule } from './about/about.module';
import { MyKittiesModule } from './mykitties/mykitties.module';
import { ForSaleModule } from './forsale/forsale.module';
import { DenModule } from './den/den.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
    MyKittiesModule,
    ForSaleModule,
    DenModule,
    LoginModule,
    RegisterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
