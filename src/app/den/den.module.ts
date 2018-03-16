import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { DenRoutingModule } from './den-routing.module';
import { DenComponent } from './den.component';
import { KittiesService } from '../shared/kitties.service';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { Ng2OrderModule } from 'ng2-order-pipe'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    DenRoutingModule,
    NgxPaginationModule,
    Ng2OrderModule
  ],
  declarations: [
    DenComponent
  ],
  providers: [
    KittiesService
  ]
})
export class DenModule { }
