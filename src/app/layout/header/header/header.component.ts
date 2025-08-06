import { Component, HostListener  } from '@angular/core';
import { RouterModule } from '@angular/router'; // 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
bgcolor = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.bgcolor = scrollY > 100;
  }
}
