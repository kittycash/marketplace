import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { DenComponent } from './den.component';

const routes: Routes = Route.withShell([
  { path: 'den_of_iniquity', component: DenComponent, data: { title: extract('The Den of Iniquity') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DenRoutingModule { }
