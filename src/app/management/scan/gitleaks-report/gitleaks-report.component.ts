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
    this.reportService.fetchReport('./gitleaks-report.json').subscribe({
      next: (result) => {
        this.data = result;
        console.log('result', result);

        console.log('Gitleaks', this.data);
      },
    });
  }

  checkURL(key: string): boolean {
    return key.includes('URL');
  }

  pageChanged(page: any): void{
    this.p = page;
  }
}
