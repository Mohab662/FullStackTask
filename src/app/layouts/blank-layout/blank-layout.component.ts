import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from './../../Components/nav-blank/nav-blank.component';
import { RouterOutlet, Scroll } from '@angular/router';
import { FooterComponent } from './../../Components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule,NavBlankComponent,RouterOutlet,FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {

  goToUp():void{
    window.scrollTo(0,0);   
  }
}