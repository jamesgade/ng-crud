import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public API_URL = 'http://localhost:5000/users';
  constructor(private http: HttpClient) { }

  addUser = (data: any) => {
    return this.http.post<any>(this.API_URL, data)
    .pipe(map((response: any) => {
      return response
    }))
  }

  updateUser = (data: any, id: number) => {
    return this.http.put<any>(this.API_URL + '/' + id, data)
    .pipe(map((response: any) => {
      return response
    }))
  }

  deleteUser(id: number) {
    return this.http.delete<any>(this.API_URL + '/' + id)
    .pipe(map((response: any) => {
      return response
    }))
  }

  getUser() {
    return this.http.get<any>(this.API_URL);
  }

  // addUser(data: any) {
  //   return this.http.post<any>(this.API_URL, data)
  //     .pipe(map((res: any) => {
  //       return res;
  //     }))
  // }

  // deleteUser(id: number) {
  //   return this.http.delete<number>(this.API_URL + '/' + id)
  //     .pipe(map((res: any) => {
  //       return res
  //     }))
  // }

  // updateUser(data: any, id: number) {
  //   return this.http.put<any>(this.API_URL + '/' + id, data)
  //     .pipe(map((res: any) => {
  //       return res;
  //     }))
  // }

}
