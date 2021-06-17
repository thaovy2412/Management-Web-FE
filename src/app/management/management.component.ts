import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  faChartLine,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  option: string = 'DASHBOARD';
  faHome = faHome;
  faRight = faChevronRight;
  faSearch = faSearch;
  faChart = faChartLine;
  faDb = faTachometerAlt;
  url: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.url = this.router.url;
    if (this.url.includes('scan/commits')) {
      this.option = 'SCANNING REPORTS';
    }
  }
  setOption(option: string) {
    this.option = option;
  }
}
