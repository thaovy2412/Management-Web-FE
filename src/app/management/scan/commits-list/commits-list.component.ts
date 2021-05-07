import { Component, OnInit } from '@angular/core';
import { Commit } from 'src/app/core/models/commits';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-commits-list',
  templateUrl: './commits-list.component.html',
  styleUrls: ['./commits-list.component.scss']
})
export class CommitsListComponent implements OnInit {
  commits: Commit[] = [
    {
      commitId: "ca82a6dff817ec66f44342007202690a93763949",
      status: "Fail",
      date: "24-04-2021 19:00:00"
    },
    {
      commitId: "085bb3bcb608e1e8451d4b2432f8ecbe6306e7e7",
      status: "Success",
      date: "25-04-2021 07:00:00"
    },
    {
      commitId: "a11bef06a3f659402fe7563abf99ad00de2209e6",
      status: "Success",
      date: "27-04-2021 14:00:00"
    },
    {
      commitId: "1234567ff817ec66f44342007202690a93763949",
      status: "Fail",
      date: "30-04-2021 15:00:00"
    },
    {
      commitId: "1234567899876543f44342007202690a93763949",
      status: "Success",
      date: "01-05-2021 05:00:00"
    }
  ]
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }
  selectCommit(id:string){
    this.reportService.setCommitID(id);
  }
}
