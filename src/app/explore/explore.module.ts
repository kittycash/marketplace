import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { KittiesService } from '../shared/kitties.service';
import { KittyDetailComponent } from '../shared/kitty_detail/kitty_detail.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    ExploreRoutingModule,
    NgxPaginationModule,
    FormsModule
  ],
  declarations: [
    ExploreComponent,
    KittyDetailComponent
  ],
  providers: [
    KittiesService
  ],
  entryComponents: [
    KittyDetailComponent
  ]
})
export class ExploreModule { }
