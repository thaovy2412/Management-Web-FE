import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeGuard } from './core/guards/home.guard';
import { LoginComponent } from './login/login.component';
import { ManagementModule } from './management/management.module';

const routes: Routes = [
  { path: '', canActivate: [HomeGuard], loadChildren: () => ManagementModule },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
