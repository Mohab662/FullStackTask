import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../services/product.service';
import { ValidationRules } from '../../shared/validation-rules';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  isLoading:boolean=false;
  errMsg:string='';

  form:FormGroup=this._fb.group({
      category: ['', [Validators.required, Validators.pattern(ValidationRules.categoryRegex)]],
      code: ['', [Validators.required, Validators.pattern(ValidationRules.codeRegex)]],
      name: ['', [Validators.required, Validators.pattern(ValidationRules.nameRegex)]],
      price: ['', [Validators.required, Validators.min(ValidationRules.minPrice), Validators.max(ValidationRules.maxPrice)]],
      discountRate: ['', [Validators.required, Validators.min(ValidationRules.minDiscount), Validators.max(ValidationRules.maxDiscount)]],
      imageFile: [null, Validators.required]
  });

  constructor(private _fb:FormBuilder, private _productService:ProductService, private _router:Router, private _toastr:ToastrService){}

  onFileChange(event:Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length>0) {
      this.form.patchValue({ imageFile: input.files[0] });
    }
  }

  submit(){
    if (this.form.invalid) { return; }
    this.isLoading=true;
    const fd = new FormData();
    const userId = localStorage.getItem('userId');
    fd.append('Name', this.form.value.name);
    fd.append('Code', this.form.value.code);
    fd.append('Category', this.form.value.category);
    fd.append('Price', String(this.form.value.price));
    fd.append('DiscountRate', String(this.form.value.discountRate || 0));
    if (userId) fd.append('UserId', userId);
    fd.append('ImageFile', this.form.value.imageFile);
    this._productService.addProduct(fd).subscribe({
      next:()=>{
        this.isLoading=false;
        this._toastr.success('Product added');
        this._router.navigate(['/products']);
      },
      error:(err)=>{
        this.isLoading=false;
        const backendMsg = err?.error?.title || err?.error?.message || err?.message;
        this.errMsg = backendMsg ? `Add failed: ${backendMsg}` : 'Add failed';
      }
    })
  }
}


