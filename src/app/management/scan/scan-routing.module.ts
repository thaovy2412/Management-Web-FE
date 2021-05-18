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
    path: '',
    component: ScanComponent,
    children: [
      { path: 'commits', component: CommitsListComponent },
      { path: 'tools', component: ToolsListComponent },
      { path: 'trivy-report', component: TrivyReportComponent },
      { path: 'gitleaks-report', component: GitleaksReportComponent },
      { path: 'zap-quickscan-report', component: ZapReportComponent },
      { path: 'zap-baseline-report', component: ZapBaselineComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanRoutingModule {}
