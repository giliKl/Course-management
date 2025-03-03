import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { partOfUser, User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  public isAuth: boolean = false;
  public userId: number = 0;
  public role = "";


  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: partOfUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    sessionStorage.setItem('userToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('userToken');
  }

  logout() {
    sessionStorage.removeItem('userToken');
  }
}
