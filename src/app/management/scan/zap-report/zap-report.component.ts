import {
  OWASPZAPReport,
  ZapReportOverView,
  ZapReportSummary,
} from './../../../core/models/zap';
import { Component, OnInit } from '@angular/core';
import { ZapReportDetail } from 'src/app/core/models/zap';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-zap-report',
  templateUrl: './zap-report.component.html',
  styleUrls: ['./zap-report.component.scss'],
})
export class ZapReportComponent implements OnInit {
  data: ZapReportDetail | undefined = undefined;
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
  levelDetail: string = "";
  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.fetchReport('./zap-quickscan-report.xml').subscribe({
      next: (result) => {
        this.data = result;
        console.log(this.data);

        this.data.OWASPZAPReport.site[0].alerts[0].alertitem.sort(
          (a, b) => parseInt(b.riskcode[0]) - parseInt(a.riskcode[0])
        );
        this.overviewReport();
        this.summaryReport();
      },
    });
  }

  overviewReport(): void {
    for (let alert of this.data.OWASPZAPReport.site[0].alerts[0].alertitem) {
      const index = this.overviewZapReport.findIndex(
        (e) => e.name === alert.name[0]
      );
      if (index != -1) {
        this.overviewZapReport[index].numberInstances = (
          parseInt(this.overviewZapReport[index].numberInstances) +
          parseInt(alert.count[0])
        ).toString()[0];
      } else {
        const item: ZapReportOverView = {
          name: alert.name[0],
          riskLevel: alert.riskdesc[0].replace(/ *\([^)]*\) */g, ''),
          riskCode: alert.riskcode[0],
          numberInstances: alert.count[0],
        };
        this.overviewZapReport.push(item);
      }
    }
    // this.overviewZapReport = this.sortRiskLevel(['High', 'Medium', 'Low']);
    this.overviewZapReport.sort((a,b)=>parseInt(b.riskCode)-parseInt(a.riskCode))
  }

  summaryReport(): void {
    for (let alert of this.data.OWASPZAPReport.site[0].alerts[0].alertitem) {
      const type = this.mapCodeToName(alert.riskcode[0]);
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

  // sortRiskLevel(level: string[]): ZapReportOverView[] {
  //   let result: ZapReportOverView[] = [];
  //   level.forEach((l) => {
  //     for (let item of this.overviewZapReport) {
  //       if (item.riskLevel === l) {
  //         result.push(item);
  //       }
  //     }
  //   });
  //   return result;
  // }

  setLevelDetail(level:string): void{
    const code = this.mapNameToCode(level);
    this.levelDetail=code;
    console.log(this.levelDetail);

  }
}
