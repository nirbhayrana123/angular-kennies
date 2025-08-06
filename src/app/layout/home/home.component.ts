import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import AOS from 'aos';

// Components
import { EmotionalswiperComponent } from '../../components/emotionalswiper/emotionalswiper.component';
import { CourseSliderComponent } from '../../components/course-slider/course-slider/course-slider.component';
import { ExercisesWorkbookComponent } from '../../components/exercises-workbook/exercises-workbook.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    EmotionalswiperComponent,
    CourseSliderComponent,
    ExercisesWorkbookComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  isExpanded = false;

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Journey to Emotional Authenticity | Emotional Authenticity Coach');
    this.metaService.updateTag({
      name: 'description',
      content: 'This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that&#039;s you, you&#039;re ready. Best Emotional Authenticity coach.',
    });
  }

  ngOnInit(): void {
    // You can add other logic here
  }

  ngAfterViewInit(): void {
    this.onWindowScroll();
    AOS.init();
  }

  toggleContent() {
    this.isExpanded = !this.isExpanded;
  }

  onWindowScroll() {
    // Your scroll logic can go here if needed
  }
}
