import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { ForSaleRoutingModule } from './forsale-routing.module';
import { ForSaleComponent } from './forsale.component';
import { KittiesService } from '../shared/kitties.service';
import { NgxPaginationModule } from 'ngx-pagination'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ForSaleRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    ForSaleComponent
  ],
  providers: [
    KittiesService
  ]
})
export class ForSaleModule { }
