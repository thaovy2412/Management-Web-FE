import { AuthService } from './core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ReportService } from './core/services/report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'security-management';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.authService.currentUser.next(sessionStorage.getItem('user'));
    }
  }
}
