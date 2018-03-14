import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from './loader/loader.component';
import { CatBoxComponent } from './catbox/catbox.component';
import { EmailConfirmationComponent } from './email_confirmation/email_confirmation.component';
import { environment } from '@env/environment';
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  providers: [ 
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptchaSiteKey } as RecaptchaSettings,
    }
  ],
  declarations: [
    LoaderComponent,
    CatBoxComponent,
    EmailConfirmationComponent
  ],
  exports: [
    LoaderComponent,
    CatBoxComponent,
    EmailConfirmationComponent
  ]
})
export class SharedModule { }
