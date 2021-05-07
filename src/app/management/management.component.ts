import { Component, OnInit } from '@angular/core';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  option:string = 'Dashboard';
  faHome=faHome;
  faRight=faChevronRight;
  faSearch=faSearch;
  faChart=faChartLine;
  constructor() { }

  ngOnInit(): void {
  }
  setOption(option:string){
    this.option=option;
  }
}
