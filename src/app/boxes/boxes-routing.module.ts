import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { BoxesComponent } from './boxes.component';

const routes: Routes = Route.withShell([
  { path: 'boxes', component: BoxesComponent, data: { title: extract('Boxes For Sale') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BoxesRoutingModule { }
