import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
 import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
   selector: 'app-emotionalswiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emotionalswiper.component.html',
  styleUrl: './emotionalswiper.component.css'
})
export class EmotionalswiperComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  slides = [
    {
      title: 'Childhood trauma',
      description: 'He is the author of Your Journey to Success, and Your Journey To Being Yourself and the creator of a process known as The Worst Day Cycle. ',
      image: 'images/7.jpeg',
      link: 'childhood-trauma.html'
    },
    {
      title: 'Relationship issues',
      description: 'He is the author of Your Journey to Success, and Your Journey To Being Yourself and the creator of a process known as The Worst Day Cycle. ',
      image: 'images/11.jpeg',
      link: 'relationship-issues.html'
    },
    {
      title: 'Parenting issues',
      description: 'He is the author of Your Journey to Success, and Your Journey To Being Yourself and the creator of a process known as The Worst Day Cycle. ',
      image: 'images/add.jpeg',
      link: 'parenting-issues.html'
    },
    {
      title: 'Narcissistic Abuse',
      description: 'He is the author of Your Journey to Success, and Your Journey To Being Yourself and the creator of a process known as The Worst Day Cycle. ',
      image: 'images/8.jpeg',
      link: 'narcissistic-abuse.html'
    },
    {
      title: 'Depression Page',
      description: 'He is the author of Your Journey to Success, and Your Journey To Being Yourself and the creator of a process known as The Worst Day Cycle. ',
      image: 'images/sad.png',
      link: 'depression.html'
    }
  ];
  ngAfterViewInit(): void {
     if (isPlatformBrowser(this.platformId)) {
    new Swiper('.emotional-swiper', {
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
       991: {
        slidesPerView: 3
      },
      767: {
        slidesPerView: 2
      },
      480: {
        slidesPerView: 1
      }
    }
    });
  }
  }
}
