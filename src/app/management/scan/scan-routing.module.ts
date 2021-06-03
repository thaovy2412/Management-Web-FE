import { ZapBaselineComponent } from './zap-baseline/zap-baseline.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommitsListComponent } from './commits-list/commits-list.component';
import { GitleaksReportComponent } from './gitleaks-report/gitleaks-report.component';
import { ScanComponent } from './scan.component';
import { ToolsListComponent } from './tools-list/tools-list.component';
import { TrivyReportComponent } from './trivy-report/trivy-report.component';
import { ZapReportComponent } from './zap-report/zap-report.component';

const routes: Routes = [
  {
    path: 'commits',
    component: ScanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanRoutingModule {}
