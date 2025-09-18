import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  // Public auth routes first
  {path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component')
    .then((m)=>m.AuthLayoutComponent),
    children:[
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login',loadComponent:()=>import('./Components/login/login.component').then((m)=>m.LoginComponent),title:"Login"},
      {path:'forget-pass',loadComponent:()=>import('./Components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent),title:"Forget Password"},
      {path:'register',loadComponent:()=>import('./Components/register/register.component').then((m)=>m.RegisterComponent),title:"Register"}
    ]},

  // Protected shell using canMatch guard
  {path:'',canMatch:[authGuard],loadComponent:()=>import('./layouts/blank-layout/blank-layout.component')
    .then((m)=>m.BlankLayoutComponent),
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',loadComponent:()=>import('./Components/home/home.component').then((m)=>m.HomeComponent),title:"Home"},
      {path:'add-product',loadComponent:()=>import('./Components/products/add-product.component').then((m)=>m.AddProductComponent),title:"Add Product"},
      {path:'products',loadComponent:()=>import('./Components/products/products.component').then((m)=>m.ProductsComponent),title:"Products"},
    ]},

  // Not-Found
  {path:'**',loadComponent:()=>import('./Components/not-found/not-found.component').then((m)=>m.NotFoundComponent),title:"notFoundPage"} 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
