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
    this.reportService.fetchReport('./trivy-report.json').subscribe({
      next: (result) => {
        this.dataReport = result;
        console.log(this.dataReport);
      },
    });
  }

  pageChanged(p: any): void{
    this.p = p;
  }

  changeType(type: string): void{
    this.type= type;
    this.p = 1;
  }
}
