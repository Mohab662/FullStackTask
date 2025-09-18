import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent {
  constructor(private _Router:Router){}

  signOut():void{
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }


}

   





