import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { EmotionalswiperComponent } from '../../components/emotionalswiper/emotionalswiper.component';
import { CourseSliderComponent } from '../../components/course-slider/course-slider/course-slider.component';
// import * as AOS from 'aos';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EmotionalswiperComponent , CourseSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

 isExpanded = false;

  toggleContent() {
    this.isExpanded = !this.isExpanded;
  }


constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Journey to Emotional Authenticity | Emotional Authenticity Coach');
    this.metaService.updateTag({
      name: 'description',
      content: 'This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that&#039;s you, you&#039;re ready. Best Emotional Authenticity coach.',
    });
  }


  //   ngOnInit(): void {
  //   AOS.init({
  //     duration: 1200,
  //     once: true,
  //   });
  // }

}
