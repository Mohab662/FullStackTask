import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './../../services/product.service';
import { Product } from './../../core/interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit{
  products:Product[]=[];
  pageSize:number=0;
  currentPage:number=1;
  total:number=0;
isLoading = true;
baseImageUrl: string = 'https://fullstackassignment.runasp.net/Files/Uploads/';

  ConvertStringToNumber(input: string) {
    var numeric = Number(input);
    return numeric;
}

  constructor(private _ProductService:ProductService ,private _ToastrService:ToastrService,private _Renderer2:Renderer2, private _Router:Router){}
  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this._ProductService.getProductsByUserEmail(email).subscribe({
        next:(response)=>{
          this.products=response;
          this.pageSize=response.length || 10;
          this.currentPage=1;
          this.total=response.length || 0; 
          this.isLoading = false;       
        }
        ,
      error:()=>{
        this.isLoading = false;
      }
    });
    } else {
      this._Router.navigate(['/login']);
    }


  }

  onDeleteAll():void{
    const email = localStorage.getItem('email');
    if (!email) { return; }
    this._ProductService.deleteAllByUserEmail(email).subscribe({
      next:()=>{
        this.products=[];
        this.total=0;
        this._ToastrService.success('All products deleted');
      }
    })
  }

  onDelete(code:string):void{
    this._ProductService.deleteByProductCode(code).subscribe({
      next:()=>{
        this.products=this.products.filter(p=>p.code!==code);
        this.total=this.products.length;
        this._ToastrService.success('Product deleted');
      }
    })
  }

  addProduct(id:any,elment:HTMLButtonElement):void{
    this._Renderer2.setAttribute(elment,'disabled','true');
    this._ToastrService.success('Product Added');

  }

  pageChanged(event:any):void{
    this.currentPage = event; // simple client-side pagination when using user-specific list
  }

getDiscountedPrice(product: any): number {
  return product.price - (product.price * (product.discountRate/100));
}


}


