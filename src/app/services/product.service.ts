import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`;
  private assignmentApi:string=`/api/Products/`;

  getPrudcts(pageNum:number=1):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products?page=${pageNum}`);
  }
  getPrudctDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products/${id}`);
  }

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
