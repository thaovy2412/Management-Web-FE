import { DataReport } from 'src/app/core/models/commits';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  commitID: string | null = null;
  tool: string | null = null;
  dataReport : DataReport[] | undefined = undefined;
  constructor(private reportService: ReportService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reportService.fetchDataReport().subscribe({
      next: (result) => {
        this.dataReport = result;
        console.log(this.dataReport);
        this.reportService.dataReport.next(this.dataReport);
        this.reportService.dataReport.subscribe({
          next: (result) => {
            console.log(result);
          }
        })
      }
    })
    this.route.queryParams.subscribe(params=>{
      this.commitID = params['id'];
      this.tool = params['tool'];
      console.log(this.tool);

    })
  }

  resetCommitID(){
    this.commitID='';
  }

  resetTool(){
    this.tool='';
    this.route.queryParams.subscribe()
  }
}
