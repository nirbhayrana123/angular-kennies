import { Component} from '@angular/core';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { EmotionalswiperComponent } from '../../../components/emotionalswiper/emotionalswiper.component'; 
import { Title, Meta } from '@angular/platform-browser'; 
import { WpService } from '../../../services/wp.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-childhood-trauma',
  standalone: true,
  imports: [RouterModule, EmotionalswiperComponent,CommonModule],
  templateUrl: './childhood-trauma.component.html',
  styleUrl: './childhood-trauma.component.css'
})
export class ChildhoodTraumaComponent {

  service: any = { acf: {} };
  bannerHeading = '';
  courseImage = '';
  featuredImage = ''; 

    constructor(
      private titleService: Title, 
      private metaService: Meta, 
      private wp: WpService,
      private route: ActivatedRoute
    ) {
      this.titleService.setTitle('Begin Your Journey Course - Kenny Weiss');
      this.metaService.updateTag({
        name: 'description',
        content: 'This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that&#039;s you, you&#039;re ready. Best Emotional Authenticity coach.',
      });
    }

ngOnInit() {
  this.courseImage = ''; 
  this.featuredImage = ''; 
  
  const slug = this.route.snapshot.paramMap.get('slug');
  
  if (slug) {
    this.wp.gethealingServicesSlug(slug).subscribe((res) => {
      if (res.length > 0) {
        this.service = res[0];

        // Banner Heading
        this.bannerHeading = this.service.acf?.banner_heading || ''; 

        // Featured image
        this.featuredImage = this.service._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

        // Course Image
        const courseImageId = this.service.acf?.course_image;
        if (courseImageId) {
          this.wp.getMediaById(courseImageId).subscribe((mediaRes) => {
            this.courseImage = mediaRes.source_url;
          });
        }
 
 
    
      }
   
 
    });
  }
  
}
}
