import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  error: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  handleLogin(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (result) => {
        this.error = false;
        sessionStorage.setItem('user', result.username);
        this.authService.setCurrentUser(result.username);
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = true;
      },
    });
  }
}
