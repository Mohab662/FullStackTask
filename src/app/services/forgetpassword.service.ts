import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  baseUrl:string=`/api/Auth`;
   constructor(private http: HttpClient) {}

  forgetPassword(model: { email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgotPasswordByEmail`, model);
  }

  // 2- التحقق من الكود
  resetCode(model: { email: string; resetCode: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/verifyResetCode`, model);
  }

  // 3- باسورد جديد
  newPassword(model: { email: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/resetPassword`, model);
  }
}



