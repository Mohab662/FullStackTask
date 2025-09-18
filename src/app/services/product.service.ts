import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  private assignmentApi:string=`${environment.apiUrl}/Products/`;



  // Assignment API
  getProductsByUserEmail(email:string):Observable<any>{
    return this._HttpClient.get(`${this.assignmentApi}getProductsByUserEmail/${encodeURIComponent(email)}`);
  }
  addProduct(formData:FormData):Observable<any>{
    return this._HttpClient.post(`${this.assignmentApi}addProduct`, formData);
  }
  deleteAllByUserEmail(email:string):Observable<any>{
    return this._HttpClient.delete(`${this.assignmentApi}deleteAllByUserEmail/${encodeURIComponent(email)}`);
  }
  deleteByProductCode(code:string):Observable<any>{
    return this._HttpClient.delete(`${this.assignmentApi}deleteByProductCode/${encodeURIComponent(code)}`);
  }
}
