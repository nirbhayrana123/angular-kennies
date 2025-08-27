import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { filter } from 'rxjs';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-headless-wp';
  
  //   constructor(private router: Router) {
  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       window.scrollTo({ top: 0, behavior: 'smooth' }); // ✅ Scroll to top
  //     });
  //     AOS.refresh();
  // }


   ngAfterViewInit(): void { 
      AOS.init(); 
    }
  

}
