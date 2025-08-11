import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser,CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { EmotionalswiperComponent } from '../../components/emotionalswiper/emotionalswiper.component';
import { CourseSliderComponent } from '../../components/course-slider/course-slider/course-slider.component';
import { ExercisesWorkbookComponent } from '../../components/exercises-workbook/exercises-workbook.component';
import { RouterModule } from '@angular/router';  
import { WpService } from '../../services/wp.service';  

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmotionalswiperComponent, CourseSliderComponent, ExercisesWorkbookComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent  {

  isExpanded = false;
  isBrowser: boolean;
   posts: any[] = []; 
   acfData: any; 
  constructor(
    private titleService: Title,
    private metaService: Meta,
     private wp: WpService, 
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

   ngOnInit() {
    this.wp.getPosts().subscribe((data: any) => {
      this.posts = data; 
       this.posts = data.map((post: any) => {
      return {
        ...post,
        courseImage: post.acf?.postimage || '',
        featuredImage:
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      };
    });
    });

 
   
  }
getShortContent(htmlContent: string, wordLimit: number = 30): string {
  if (!htmlContent) return '';

  // HTML tags hatao
  const text = htmlContent.replace(/<[^>]+>/g, '');

  // Words me split karke limit lagao
  const words = text.split(/\s+/).slice(0, wordLimit);

  return words.join(' ') + (words.length >= wordLimit ? '...' : '');
}

 

  toggleContent(): void {
    this.isExpanded = !this.isExpanded;
  }

  onWindowScroll(): void {
    // Optional: Add scroll animation/logic here if needed
  }
  

 
  isLightboxOpen = false;

  openLightbox() {
    this.isLightboxOpen = true;
  }

  closeLightbox() {
    this.isLightboxOpen = false;
  }

  

  }


 
