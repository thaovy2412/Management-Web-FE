import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tool } from 'src/app/core/models/commits';
import { ReportService } from 'src/app/core/services/report.service';
import { environment } from '../../../../environments/environment';
import { faListAlt, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss'],
})
export class ToolsListComponent implements OnInit {
  selectedCommitDetail: Tool[] = [];
  commitid: string = '';
  sonarUrl: string = environment.sonarUrl + '/dashboard?id=web-app';
  faDetail = faListAlt;
  faOptions = faCog;
  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.commitid = params['id'];
      this.reportService.dataReport.subscribe({
        next: (result) => {
          if (result) {
            this.selectedCommitDetail = [];
            const selectedCommit = result?.find(
              (item) => item.commitid === this.commitid
            );
            console.log(selectedCommit);

            const zap_baseline: Tool = {
              name: 'ZAP Baseline',
              param: 'zap-baseline',
              status: selectedCommit?.zap_baseline,
            };
            const zap_quickscan: Tool = {
              name: 'ZAP Quickscan',
              param: 'zap-quickscan',
              status: selectedCommit?.zap_quickscan,
            };
            const sonar: Tool = {
              name: 'SonarQube',
              param: 'sonarqube',
              status: selectedCommit?.sonarqube,
            };
            const trivy: Tool = {
              name: 'Trivy',
              param: 'trivy',
              status: selectedCommit?.trivy,
            };
            const gitleaks: Tool = {
              name: 'Gitleaks',
              param: 'gitleaks',
              status: selectedCommit?.gitleaks,
            };
            this.selectedCommitDetail.push(zap_baseline);
            this.selectedCommitDetail.push(zap_quickscan);
            this.selectedCommitDetail.push(sonar);
            this.selectedCommitDetail.push(trivy);
            this.selectedCommitDetail.push(gitleaks);
          }
        },
      });
    });
  }

  setTool(tool: string) {
    this.reportService.setTool(tool);
  }

  onChangeStatus(tool: string, status: string) {
    const toolClone = tool.toLowerCase().replace(' ', '_');
    this.reportService
      .updateStatusTool(this.commitid, toolClone, status)
      .subscribe({
        next: () => {
          this.reportService.updateStatusCommit(this.commitid).subscribe({
            next: () => {
              this.reload();
            },
            error: () => {
              this.reload();
            },
          });
        },
        error: () => {
          this.reportService.updateStatusCommit(this.commitid).subscribe({
            next: () => {
              this.reload();
            },
            error: () => {
              this.reload();
            },
          });
        },
      });
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/scan/commits'], {
        queryParams: { id: this.commitid },
      });
    });
  }
}
