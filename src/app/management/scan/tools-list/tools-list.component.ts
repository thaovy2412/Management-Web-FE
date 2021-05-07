import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss']
})
export class ToolsListComponent implements OnInit {
  tools: string[] =[
    "ZAP", "SonarQube", "Gitleaks", "Trivy"
  ]
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  setTool(tool: string){
    this.reportService.setTool(tool);
  }
}
