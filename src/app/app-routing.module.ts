import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementModule } from './management/management.module';

const routes: Routes = [
  {path:'', loadChildren:()=>ManagementModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
