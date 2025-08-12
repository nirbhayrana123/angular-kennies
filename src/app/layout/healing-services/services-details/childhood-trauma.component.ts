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
  cardImage1 = '';
  cardImage2 = '';
  cardImage3 = '';
  postcardImage1 = '';
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
  this.cardImage1 = '';
  this.cardImage2 = '';
  this.cardImage3 = '';
  this.postcardImage1 = '';
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
 
 
      const cardImage1Id = this.service.acf?.healing_service_card_one_image;
        if (cardImage1Id) {
          this.wp.getMediaById(cardImage1Id).subscribe((mediaRes) => {
            this.cardImage1 = mediaRes.source_url;
          });
        }


const cardImage2Id = this.service.acf?.healing_service_card_tow_image;
        if (cardImage2Id) {
          this.wp.getMediaById(cardImage2Id).subscribe((mediaRes) => {
            this.cardImage2 = mediaRes.source_url;
          });
        }


const cardImage3Id = this.service.acf?.healing_service_card_three_image;
        if (cardImage3Id) {
          this.wp.getMediaById(cardImage3Id).subscribe((mediaRes) => {
            this.cardImage3 = mediaRes.source_url;
          });
        }


const postcardImage1Id = this.service.acf?.healing_service_card_three_image;
        if (postcardImage1Id) {
          this.wp.getMediaById(postcardImage1Id).subscribe((mediaRes) => {
            this.postcardImage1 = mediaRes.source_url;
          });
        }
    
      }
   
 
    });
  }
  
}
}
