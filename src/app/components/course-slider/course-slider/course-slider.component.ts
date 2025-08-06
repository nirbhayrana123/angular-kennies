 
import { Component, AfterViewInit, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

@Component({
  selector: 'app-course-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-slider.component.html',
  styleUrl: './course-slider.component.css'
})
export class CourseSliderComponent implements AfterViewInit {
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  courses = [
    {
      title: 'Begin Your Journey To Emotional Authenticity',
      description: 'Learn the first, foundational steps in developing Emotional Authenticity',
      image: './images/price-change1.jpeg',
      price: '$29.77',
      originalPrice: '$120',
      lessons: 12,
      students: 50,
      link: '/courses'
    },
    {
      title: 'The Complete Emotional Authenticity Method (one-time Purchase)',
      description: 'Overcome your Worst Day Cycle and reclaim your authentic self with Emotional Authenticity',
      image: './images/price-change2.png',
      price: '$29.77',
      originalPrice: '$120',
      lessons: 12,
      students: 50,
      link: 'courses.html'
    },
    {
      title: 'The Complete Emotional Authenticity Method Subscription',
      description: 'Overcome your Worst Day Cycle and reclaim your authentic self with Emotional Authenticity',
      image: 'images/price-change3.png',
      price: '$77/month',
      originalPrice: '$120',
      lessons: 12,
      students: 50,
      link: '/courses'
    },
       {
      title: 'The Complete Emotional Authenticity Method Subscription',
      description: 'Overcome your Worst Day Cycle and reclaim your authentic self with Emotional Authenticity',
      image: 'images/price-change3.png',
      price: '$77/month',
      originalPrice: '$120',
      lessons: 12,
      students: 50,
      link: '/courses'
    }
  ];

  ngAfterViewInit(): void {
     if (isPlatformBrowser(this.platformId)) {
    setTimeout(() => {
      new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          }
        }
      });
    });
  }
}
}
