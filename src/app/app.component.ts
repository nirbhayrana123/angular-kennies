import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { filter } from 'rxjs';
import * as AOS from 'aos';
import { GoogleTagManagerService } from './services/google-tag-manager.service.ts';
@Component({
    selector: 'app-root',
    imports: [HeaderComponent, FooterComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Kenny Weiss';
  
  //   constructor(private router: Router) {
  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       window.scrollTo({ top: 0, behavior: 'smooth' }); // ✅ Scroll to top
  //     });
  //     AOS.refresh();
  // }

  constructor(private gtmService: GoogleTagManagerService) {}
   ngAfterViewInit(): void { 
      AOS.init(); 
    }
   ngOnInit(): void {
    this.gtmService.init();
  }

}
