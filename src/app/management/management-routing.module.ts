import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management.component';
import { ScanModule } from './scan/scan.module';

const routes: Routes = [
  {path:'', component: ManagementComponent, children:[
    {path:'scan', loadChildren:()=>ScanModule},
    {path:'', component:DashboardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
