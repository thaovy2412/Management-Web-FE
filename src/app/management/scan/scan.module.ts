import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScanRoutingModule } from './scan-routing.module';
import { ScanComponent } from './scan.component';
import { CommitsListComponent } from './commits-list/commits-list.component';
import { ToolsListComponent } from './tools-list/tools-list.component';
import { ZapReportComponent } from './zap-report/zap-report.component';
import { TrivyReportComponent } from './trivy-report/trivy-report.component';
import { GitleaksReportComponent } from './gitleaks-report/gitleaks-report.component';
import { SonarqubeReportComponent } from './sonarqube-report/sonarqube-report.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ZapBaselineComponent } from './zap-baseline/zap-baseline.component';



@NgModule({
  declarations: [ScanComponent, CommitsListComponent, ToolsListComponent, ZapReportComponent, TrivyReportComponent, GitleaksReportComponent, SonarqubeReportComponent, ZapBaselineComponent],
  imports: [
    CommonModule,
    ScanRoutingModule,
    NgxPaginationModule
  ]
})
export class ScanModule { }
