import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  public API_URL = 'http://localhost:5000/users';
  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  registerUser = (userData: any) => {
    return this.http.post(this.API_URL, userData)
  }

  loginUser = () => {
    return this.http.get<any>(this.API_URL)
  }

}
