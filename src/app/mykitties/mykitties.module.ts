import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MyKittiesRoutingModule } from './mykitties-routing.module';
import { MyKittiesComponent } from './mykitties.component';
import { KittiesService } from '../shared/kitties.service';
import { NgxPaginationModule } from 'ngx-pagination'; 

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    MyKittiesRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    MyKittiesComponent
  ],
  providers: [
    KittiesService
  ]
})
export class MyKittiesModule { }
