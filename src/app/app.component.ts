import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
import * as AOS from 'aos'; 
@Component({
    selector: 'app-root',
    imports: [HeaderComponent, FooterComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor( @Inject(PLATFORM_ID) private platformId: Object)
   {
    
    }
   ngOnInit(): void {
   }
   ngAfterViewInit(): void { 
      AOS.init(); 
    }
  

} 
