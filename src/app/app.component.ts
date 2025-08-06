import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-headless-wp';




  constructor(private router: Router) {
    // Scroll to top on route change
    this.router.events.subscribe((event: any) => {
      if (event.constructor.name === 'NavigationEnd') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }


}
