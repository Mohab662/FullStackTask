import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userInfo:any;

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string=`/api/Auth/`;
  
  Register(userData:{userName:string; email:string; password:string;}):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'register',userData);
  }
  Login(userData:{email:string; password:string;}):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'login',userData);
  }

 decodeUser(): void {
    const token = localStorage.getItem('etoken');
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      this.userInfo = {
        id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        exp: decoded["exp"]
      };
      if (this.userInfo?.email) localStorage.setItem('email', this.userInfo.email);
      if (this.userInfo?.id) localStorage.setItem('userId', String(this.userInfo.id));
    } catch (err) {
      console.error("Token decode error:", err);
    }
  }
refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  return this._HttpClient.post('/api/Auth/refreshtoken', { refreshToken });
}


}
