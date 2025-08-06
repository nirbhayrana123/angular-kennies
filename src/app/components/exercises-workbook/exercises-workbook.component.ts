import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-exercises-workbook',
  standalone: true,
  templateUrl: './exercises-workbook.component.html',
  styleUrls: ['./exercises-workbook.component.css'],
})
export class ExercisesWorkbookComponent implements AfterViewInit {
  @ViewChildren('stepElement') steps!: QueryList<ElementRef>;
  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollMiddle = scrollTop + windowHeight / 2;

    this.steps.forEach((step) => {
      const el = step.nativeElement;
      const offsetTop = el.offsetTop;
      const offsetBottom = offsetTop + el.offsetHeight;

      if (scrollMiddle >= offsetTop && scrollMiddle < offsetBottom) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.onWindowScroll();
    }
  }
}
