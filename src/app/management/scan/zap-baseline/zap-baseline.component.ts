import { ReportService } from './../../../core/services/report.service';
import { ZapReportDetail, ZapReportOverView, ZapReportSummary } from './../../../core/models/zap';
import { Component, OnInit } from '@angular/core';
import { ZapBaselineReport } from 'src/app/core/models/zap-baseline';

@Component({
  selector: 'app-zap-baseline',
  templateUrl: './zap-baseline.component.html',
  styleUrls: ['./zap-baseline.component.scss']
})
export class ZapBaselineComponent implements OnInit {
  data: ZapBaselineReport | undefined = undefined;
  overviewZapReport: ZapReportOverView[] = [];
  summaryAlerts: ZapReportSummary[] = [
    {
      riskLevel: 'High',
      numberAlerts: '0',
    },
    {
      riskLevel: 'Medium',
      numberAlerts: '0',
    },
    {
      riskLevel: 'Low',
      numberAlerts: '0',
    },
    {
      riskLevel: 'Informational',
      numberAlerts: '0',
    },
  ];
  levelDetail: string = '';
  constructor(private ReportService: ReportService) {}

  ngOnInit(): void {
    this.ReportService.commitID.subscribe({
      next: (id) => {
        this.ReportService.tool.subscribe({
          next: (tool) => {
            this.ReportService
              .fetchDetailReport(id, tool.toLowerCase().replace(' ', '-'))
              .subscribe({
                next: (result) => {
                  this.data = result;
                  this.data.site[0].alerts.sort(
                    (a, b) => parseInt(b.riskcode[0]) - parseInt(a.riskcode[0])
                  );
                  this.overviewReport();
                  this.summaryReport();
                  console.log('overview',this.overviewZapReport);
                  console.log('summary', this.summaryAlerts);


                },
              });
          },
        });
      },
    });
  }

  overviewReport(): void {
    for (let alert of this.data.site[0].alerts) {
      const index = this.overviewZapReport.findIndex(
        (e) => e.name === alert.name
      );
      if (index != -1) {
        this.overviewZapReport[index].numberInstances = (
          parseInt(this.overviewZapReport[index].numberInstances) +
          parseInt(alert.count)
        ).toString();
      } else {
        const item: ZapReportOverView = {
          name: alert.name,
          riskLevel: alert.riskdesc.replace(/ *\([^)]*\) */g, ''),
          riskCode: alert.riskcode,
          numberInstances: alert.count,
        };
        this.overviewZapReport.push(item);
      }
    }
    // this.overviewZapReport = this.sortRiskLevel(['High', 'Medium', 'Low']);
    this.overviewZapReport.sort(
      (a, b) => parseInt(b.riskCode) - parseInt(a.riskCode)
    );
  }

  summaryReport(): void {
    for (let alert of this.data.site[0].alerts) {
      const type = this.mapCodeToName(alert.riskcode);
      const index = this.summaryAlerts.findIndex((e) => e.riskLevel === type);
      this.summaryAlerts[index].numberAlerts = (
        parseInt(this.summaryAlerts[index].numberAlerts) + 1
      ).toString();
    }
  }

  mapCodeToName(code: string): string {
    switch (code) {
      case '0':
        return 'Informational';
        break;
      case '1':
        return 'Low';
        break;
      case '2':
        return 'Medium';
        break;
      default:
        return 'High';
        break;
    }
  }

  mapNameToCode(name: string): string {
    switch (name) {
      case 'Informational':
        return '0';
        break;
      case 'Low':
        return '1';
        break;
      case 'Medium':
        return '2';
        break;
      default:
        return '3';
        break;
    }
  }

  setLevelDetail(level: string): void {
    const code = this.mapNameToCode(level);
    this.levelDetail = code;
    console.log(this.levelDetail);
  }
}
