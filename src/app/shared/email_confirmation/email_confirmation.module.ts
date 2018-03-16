import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../../core';
import { SharedModule } from '../../shared';
import { EmailConfirmationComponent } from './email_confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class EmailConfirmationModule { }
