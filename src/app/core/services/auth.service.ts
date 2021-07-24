import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    const url = `${environment.apiUrl}/users/login`;
    return this.http.post<any>(url, user);
  }

  setCurrentUser = (username) => {
    this.currentUser.next(username);
  };
}
