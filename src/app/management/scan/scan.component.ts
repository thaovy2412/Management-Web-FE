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
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.commitID.subscribe({
      next: (result) =>{
        this.commitID = result;
      }
    });
    this.reportService.tool.subscribe({
      next: (result) =>{
        this.tool = result;
      }
    })
  }

  resetCommitID(){
    this.reportService.setCommitID('');
  }

  resetTool(){
    this.reportService.setTool('');
  }
}
