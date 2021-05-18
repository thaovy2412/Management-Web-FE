import { Total } from './../../../core/models/trivy';
import { Component, OnInit } from '@angular/core';
import { TrivyReport } from 'src/app/core/models/trivy';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-trivy-report',
  templateUrl: './trivy-report.component.html',
  styleUrls: ['./trivy-report.component.scss'],
})
export class TrivyReportComponent implements OnInit {
  dataReport: TrivyReport[] | null = null;
  p: number = 1;
  type: string = "";

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.commitID.subscribe({
      next: (id) => {
        this.reportService.tool.subscribe({
          next: (tool) =>{
            this.reportService.fetchDetailReport(id,tool.toLowerCase()).subscribe({
              next: (result) => {
                this.dataReport = result;
                this.dataReport.forEach((target) => {
                  let summary: Total ={
                    total: target.Vulnerabilities.length,
                    unknown: 0,
                    low: 0,
                    medium: 0,
                    high: 0,
                    critical: 0
                  }
                  target.Vulnerabilities.forEach((vuln)=>{
                    summary[vuln.Severity.toLowerCase()]++;
                  })
                  target.Summary = summary;
                })
                console.log(this.dataReport);

              }
            })
          }
        })
      }
    })
  }

  pageChanged(p: any): void{
    this.p = p;
  }

  changeType(type: string): void{
    this.type= type;
    this.p = 1;
  }
}
