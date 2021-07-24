import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  faChartLine,
  faTachometerAlt,
  faUser,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../core/services/auth.service';

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
  faUser = faUser;
  faSignOut = faSignOutAlt;
  url: string = '';
  currentUser: string = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.url = this.router.url;
    if (this.url.includes('scan/commits')) {
      this.option = 'SCANNING REPORTS';
    }
    this.authService.currentUser.subscribe({
      next: (result) => {
        this.currentUser = result;
      },
    });
  }
  setOption(option: string) {
    this.option = option;
  }

  handleLogOut(): void {
    this.authService.setCurrentUser('');
    this.router.navigateByUrl('/login');
  }
}
