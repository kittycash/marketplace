import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from './loader/loader.component';
import { CatBoxComponent } from './catbox/catbox.component';
import { AccountConfirmationComponent } from './account_confirmation/account_confirmation.component';
import { ConfirmInputDirective } from './account_confirmation/confirm_input.directive';
import { FocusService } from './account_confirmation/focus.service';
import { InternationalPhoneModule } from 'ng4-intl-phone';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    InternationalPhoneModule
  ],
  providers: [
    FocusService
  ],
  declarations: [
    LoaderComponent,
    CatBoxComponent,
    AccountConfirmationComponent,
    ConfirmInputDirective
  ],
  exports: [
    LoaderComponent,
    CatBoxComponent,
    AccountConfirmationComponent,
    ConfirmInputDirective,
  ]
})
export class SharedModule { }
