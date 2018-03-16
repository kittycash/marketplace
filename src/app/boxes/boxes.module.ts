import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { BoxesRoutingModule } from './boxes-routing.module';
import { BoxesComponent } from './boxes.component';
import { KittiesService } from '../shared/kitties.service';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { Paging } from '../shared/paging';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CoreModule,
    SharedModule,
    BoxesRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    BoxesComponent
  ],
  providers: [
    KittiesService,
    Paging
  ]
})
export class BoxesModule { }
