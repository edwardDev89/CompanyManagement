import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http:HttpClient) { }

  login(userLoginRequest:any):Observable<user>{
    return this.http.post<user>('https://api.realworld.io/api/users/login',{ user: userLoginRequest })
  }

  register(userAddRequest:any):Observable<user>{
      return this.http.post<user>('https://api.realworld.io/api/users',{ user: userAddRequest })
  }

  getUser():Observable<user>{
    return this.http.get<user>('https://api.realworld.io/api/user')
}
}
