import { Component, OnInit } from '@angular/core';
import { Tool } from 'src/app/core/models/commits';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss']
})
export class ToolsListComponent implements OnInit {
  selectedCommitDetail: Tool[] = [];
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.dataReport.subscribe({
      next: (result) => {
        const selectedCommit = result.find(item=>item.commitid===this.reportService.commitID.value);
        const zap_baseline : Tool = {name: 'ZAP Baseline', path: 'zap-baseline-report' ,status: selectedCommit.zap_baseline};
        const zap_quickscan : Tool = {name: 'ZAP Quickscan', path: 'zap-quickscan-report' , status: selectedCommit.zap_quickscan};
        const sonar : Tool = {name: 'SonarQube', path: 'sonarqube-report' , status: selectedCommit.sonarqube};
        const trivy : Tool = {name: 'Trivy', path: 'trivy-report' , status: selectedCommit.trivy};
        const gitleaks : Tool = {name: 'Gitleaks', path: 'gitleaks-report' , status: selectedCommit.gitleaks};
        this.selectedCommitDetail.push(zap_baseline);
        this.selectedCommitDetail.push(zap_quickscan);
        this.selectedCommitDetail.push(sonar);
        this.selectedCommitDetail.push(trivy);
        this.selectedCommitDetail.push(gitleaks);
      }
    })
  }

  setTool(tool: string){
    this.reportService.setTool(tool);
  }
}
