import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { ForSaleComponent } from './forsale.component';

const routes: Routes = Route.withShell([
  { path: 'forsale', component: ForSaleComponent, data: { title: extract('Kitties For Sale') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ForSaleRoutingModule { }
