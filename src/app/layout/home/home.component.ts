import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { EmotionalswiperComponent } from '../../components/emotionalswiper/emotionalswiper.component';
import { CourseSliderComponent } from '../../components/course-slider/course-slider/course-slider.component';
import { ExercisesWorkbookComponent } from '../../components/exercises-workbook/exercises-workbook.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmotionalswiperComponent, CourseSliderComponent, ExercisesWorkbookComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent  {

  isExpanded = false;
  isBrowser: boolean;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Set title and meta description
    this.titleService.setTitle('Journey to Emotional Authenticity | Emotional Authenticity Coach');
    this.metaService.updateTag({
      name: 'description',
      content: `This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that's you, you're ready. Best Emotional Authenticity coach.`,
    });
  }

  ngOnInit(): void {
    // You can put any logic here that runs on initialization
  }

 

  toggleContent(): void {
    this.isExpanded = !this.isExpanded;
  }

  onWindowScroll(): void {
    // Optional: Add scroll animation/logic here if needed
  }

}
