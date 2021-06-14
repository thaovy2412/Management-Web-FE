import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ManagementComponent, DashboardComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FontAwesomeModule,
    MatIconModule,
    NgxPaginationModule,
    FontAwesomeModule,
    ChartsModule,
  ],
})
export class ManagementModule {}
