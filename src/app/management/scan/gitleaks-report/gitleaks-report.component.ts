import { Component, OnInit } from '@angular/core';
import { GitleaksReport } from 'src/app/core/models/gitleaks';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-gitleaks-report',
  templateUrl: './gitleaks-report.component.html',
  styleUrls: ['./gitleaks-report.component.scss'],
})
export class GitleaksReportComponent implements OnInit {
  data: GitleaksReport[] | null = null;
  p: number = 1;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.commitID.subscribe({
      next: (id) => {
        this.reportService.tool.subscribe({
          next: (tool) =>{
            this.reportService.fetchDetailReport(id,tool.toLowerCase()).subscribe({
              next: (result) => {
                this.data = result;
              }
            })
          }
        })
      }
    })
  }

  checkURL(key: string): boolean {
    return key.includes('URL');
  }

  pageChanged(page: any): void{
    this.p = page;
  }
}
