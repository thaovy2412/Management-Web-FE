import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private reportService: ReportService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reportService.dataReport.subscribe({
      next: (result) => {
        this.dataReport = result;
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
