import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { KittiesService } from '../shared/kitties.service';
import { NgxPaginationModule } from 'ngx-pagination'; 

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ExploreRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    ExploreComponent
  ],
  providers: [
    KittiesService
  ]
})
export class ExploreModule { }
