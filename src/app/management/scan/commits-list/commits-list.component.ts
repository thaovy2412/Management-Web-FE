import { Component, OnInit } from '@angular/core';
import { DataReport } from 'src/app/core/models/commits';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-commits-list',
  templateUrl: './commits-list.component.html',
  styleUrls: ['./commits-list.component.scss']
})
export class CommitsListComponent implements OnInit {
  dataReport : DataReport[] | undefined = undefined;
  p: number = 1;
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.fetchDataReport().subscribe({
      next: (result) => {
        this.dataReport = result;
        console.log(this.dataReport);
        this.reportService.dataReport.next(this.dataReport);
      }
    })
  }
  selectCommit(id:string){
    this.reportService.setCommitID(id);
  }

  pageChanged(e): void {
    this.p = e;
  }
}
