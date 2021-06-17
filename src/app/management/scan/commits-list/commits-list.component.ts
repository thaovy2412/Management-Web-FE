import { ZapBaselineExcel } from './../../../core/models/zap-baseline';
import { TrivyReport, TrivyExcel } from './../../../core/models/trivy';
import { GitleaksReport } from './../../../core/models/gitleaks';
import { SummaryExcel } from './../../../core/models/table';
import { Component, OnInit } from '@angular/core';
import { DataReport } from 'src/app/core/models/commits';
import { ReportService } from 'src/app/core/services/report.service';
import { ExportService } from 'src/app/core/services/export.service';
import { Alert } from 'src/app/core/models/zap-baseline';
import { Alertitem, ZapQuickScanExcel } from 'src/app/core/models/zap';
import {
  faFileDownload,
  faSearch,
  faListAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-commits-list',
  templateUrl: './commits-list.component.html',
  styleUrls: ['./commits-list.component.scss'],
})
export class CommitsListComponent implements OnInit {
  faFileDownload = faFileDownload;
  faSearch = faSearch;
  faDetail = faListAlt;
  dataReport: DataReport[] | undefined = undefined;
  p: number = 1;
  s: boolean = false;
  tsummary: SummaryExcel[] = [];
  gitleaks: GitleaksReport[] = [];
  trivy: TrivyExcel[] = [];
  zapbaseline: ZapBaselineExcel[] = [];
  zapquickscan: ZapQuickScanExcel[] = [];
  searchForm: FormGroup = new FormGroup({
    key: new FormControl(''),
  });
  constructor(
    private reportService: ReportService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.reportService.dataReport.subscribe({
      next: (result) => {
        console.log(result);

        result.sort((a, b) => {
          return +new Date(b.date) - +new Date(a.date);
        });
        this.dataReport = result;
      },
    });
    this.onChangeSearch();
  }
  selectCommit(id: string) {
    this.reportService.setCommitID(id);
  }

  pageChanged(e): void {
    this.p = e;
  }

  handleExport(id: string): void {
    this.tsummary = [];
    this.gitleaks = [];
    this.trivy = [];
    this.zapbaseline = [];
    this.zapquickscan = [];
    const selectedCommit = this.dataReport.find(
      (commit) => commit.commitid === id
    );
    this.tsummary.push({
      Scanners: 'Gitleaks',
      Status: selectedCommit.gitleaks,
    });
    this.tsummary.push({ Scanners: 'Trivy', Status: selectedCommit.trivy });
    this.tsummary.push({
      Scanners: 'SonarQube',
      Status: selectedCommit.sonarqube,
    });
    this.tsummary.push({
      Scanners: 'OWASP ZAP Baseline',
      Status: selectedCommit.zap_baseline,
    });
    this.tsummary.push({
      Scanners: 'OWASP ZAP Quickscan',
      Status: selectedCommit.zap_quickscan,
    });
    this.reportService.fetchDetailReport(id, 'gitleaks').subscribe({
      next: (gresult) => {
        this.gitleaks = gresult;
        this.reportService.fetchDetailReport(id, 'trivy').subscribe({
          next: (tresult) => {
            this.trivy = this.handleTrivy(tresult);
            this.reportService.fetchDetailReport(id, 'zap-baseline').subscribe({
              next: (zapbresult) => {
                this.zapbaseline = this.handleZapBaseline(
                  zapbresult.site[0].alerts
                );
                this.reportService
                  .fetchDetailReport(id, 'zap-quickscan')
                  .subscribe({
                    next: (zapqresult) => {
                      this.zapquickscan = this.handleZapQuickScan(
                        zapqresult.OWASPZAPReport.site[0].alerts[0].alertitem
                      );
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                    error: () => {
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                  });
              },
              error: () => {
                this.reportService
                  .fetchDetailReport(id, 'zap-quickscan')
                  .subscribe({
                    next: (zapqresult) => {
                      this.zapquickscan = this.handleZapQuickScan(
                        zapqresult.OWASPZAPReport.site[0].alerts[0].alertitem
                      );
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                    error: () => {
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                  });
              },
            });
          },
          error: () => {
            this.reportService.fetchDetailReport(id, 'zap-baseline').subscribe({
              next: (zapbresult) => {
                this.zapbaseline = this.handleZapBaseline(
                  zapbresult.site[0].alerts
                );
                this.reportService
                  .fetchDetailReport(id, 'zap-quickscan')
                  .subscribe({
                    next: (zapqresult) => {
                      this.zapquickscan = this.handleZapQuickScan(
                        zapqresult.OWASPZAPReport.site[0].alerts[0].alertitem
                      );
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                    error: () => {
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                  });
              },
              error: () => {
                this.reportService
                  .fetchDetailReport(id, 'zap-quickscan')
                  .subscribe({
                    next: (zapqresult) => {
                      this.zapquickscan = this.handleZapQuickScan(
                        zapqresult.OWASPZAPReport.site[0].alerts[0].alertitem
                      );
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                    error: () => {
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                  });
              },
            });
          },
        });
      },
      error: () => {
        this.reportService.fetchDetailReport(id, 'trivy').subscribe({
          next: (tresult) => {
            this.trivy = this.handleTrivy(tresult);
            this.reportService.fetchDetailReport(id, 'zap-baseline').subscribe({
              next: (zapbresult) => {
                this.zapbaseline = this.handleZapBaseline(
                  zapbresult.site[0].alerts
                );
                this.reportService
                  .fetchDetailReport(id, 'zap-quickscan')
                  .subscribe({
                    next: (zapqresult) => {
                      this.zapquickscan = this.handleZapQuickScan(
                        zapqresult.OWASPZAPReport.site[0].alerts[0].alertitem
                      );
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                    error: () => {
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                  });
              },
              error: () => {
                this.reportService
                  .fetchDetailReport(id, 'zap-quickscan')
                  .subscribe({
                    next: (zapqresult) => {
                      this.zapquickscan = this.handleZapQuickScan(
                        zapqresult.OWASPZAPReport.site[0].alerts[0].alertitem
                      );
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                    error: () => {
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                  });
              },
            });
          },
          error: () => {
            this.reportService.fetchDetailReport(id, 'zap-baseline').subscribe({
              next: (zapbresult) => {
                this.zapbaseline = this.handleZapBaseline(
                  zapbresult.site[0].alerts
                );
                this.reportService
                  .fetchDetailReport(id, 'zap-quickscan')
                  .subscribe({
                    next: (zapqresult) => {
                      this.zapquickscan = this.handleZapQuickScan(
                        zapqresult.OWASPZAPReport.site[0].alerts[0].alertitem
                      );
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                    error: () => {
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                  });
              },
              error: () => {
                this.reportService
                  .fetchDetailReport(id, 'zap-quickscan')
                  .subscribe({
                    next: (zapqresult) => {
                      this.zapquickscan = this.handleZapQuickScan(
                        zapqresult.OWASPZAPReport.site[0].alerts[0].alertitem
                      );
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                    error: () => {
                      this.exportService.exportAsExcelFile(
                        this.tsummary,
                        this.gitleaks,
                        this.trivy,
                        this.zapbaseline,
                        this.zapquickscan,
                        id + '_report'
                      );
                    },
                  });
              },
            });
          },
        });
      },
    });
  }

  handleTrivy(trivy: TrivyReport[]): TrivyExcel[] {
    let trivyExcel: TrivyExcel[] = [];
    trivy.forEach((target) => {
      target.Vulnerabilities.forEach((vul) => {
        const item: TrivyExcel = {
          Target: target.Target,
          Type: target.Type,
          PkgName: vul.PkgName,
          VulnerabilityID: vul.VulnerabilityID,
          Severity: vul.Severity,
          InstalledVersion: vul.InstalledVersion,
          FixedVersion: vul.FixedVersion,
          Title: vul.Title,
        };
        trivyExcel.push(item);
      });
    });
    return trivyExcel;
  }

  handleZapBaseline(zapbl: Alert[]): ZapBaselineExcel[] {
    let zapblexcel: ZapBaselineExcel[] = [];
    zapbl.forEach((alert) => {
      alert.instances.forEach((ins) => {
        let sInstance = 'URI: ' + ins.uri + '   -   Method: ' + ins.method;
        const item: ZapBaselineExcel = {
          Alert: alert.alert,
          RiskLevel: alert.riskdesc,
          Instance: sInstance,
        };
        zapblexcel.push(item);
      });
    });
    return zapblexcel;
  }

  handleZapQuickScan(zapqc: Alertitem[]): ZapQuickScanExcel[] {
    const zapqcExcel: ZapQuickScanExcel[] = [];
    zapqc.forEach((alert) => {
      alert.instances[0].instance.forEach((ins) => {
        let sInstance =
          'URI: ' + ins.uri[0] + '   -   Method: ' + ins.method[0];
        const item: ZapQuickScanExcel = {
          Alert: alert.alert[0],
          RiskLevel: alert.riskdesc[0],
          Instance: sInstance,
        };
        zapqcExcel.push(item);
      });
    });
    return zapqcExcel;
  }

  handleSearch() {
    this.reportService.search(this.searchForm.get('key').value).subscribe({
      next: (result) => {
        this.dataReport = result;
      },
    });
  }

  onChangeSearch() {
    this.searchForm.valueChanges.subscribe((val) => {
      this.p = 1;
      if (val === '') {
        this.reportService.fetchDataReport().subscribe({
          next: (result) => {
            this.dataReport = result;
          },
        });
      } else {
        this.reportService.search(val.key).subscribe({
          next: (searchResult) => {
            this.dataReport = searchResult;
          },
        });
      }
    });
  }
}
