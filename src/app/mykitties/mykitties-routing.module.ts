import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { MyKittiesComponent } from './mykitties.component';

const routes: Routes = Route.withAuthenticatedShell([
  { path: 'mine', component: MyKittiesComponent, data: { title: extract('My Kitties') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MyKittiesRoutingModule { }
