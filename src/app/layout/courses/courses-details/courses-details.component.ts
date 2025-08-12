import { Component} from '@angular/core';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { CourseSliderComponent } from '../../../components/course-slider/course-slider/course-slider.component';
import { FaqSectionComponent } from '../../../components/faq-section/faq-section.component';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe'; // pipe ka import
import { Title, Meta } from '@angular/platform-browser'; 
import { WpService } from '../../../services/wp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-details',
  standalone: true,
  imports: [RouterModule, CourseSliderComponent, FaqSectionComponent, CommonModule, SafeUrlPipe ],
  templateUrl: './courses-details.component.html',
  styleUrl: './courses-details.component.css' 
})
export class CoursesDetailsComponent {
  service: any = { acf: {} };


  loading = true;
  bannerHeading = '';
  courseImage = '';
  featuredImage = ''; 
  serviceLoaded = false;
  backgroundImage = ''; 
  mainImage ='';
  videoImage ='';
  secondcardVedioleftImage = '';
  secondcardleftImage = '';
  benefits: string[] = [];
  curriculum_list: string[] = [];
  videoUrl: string = ''; 
  introvideoUrl: string = ''; 
  faqQ: string[] = [];
  faqA: string[] = [];
  


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
  this.backgroundImage = '';
  this.featuredImage = ''; 
  
  const slug = this.route.snapshot.paramMap.get('slug');
  
  if (slug) {
    this.wp.getServiceBySlug(slug).subscribe((res) => {
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

        // Background Image
        const backgroundImageId = this.service.acf?.background_img;
        if (backgroundImageId) {
          this.wp.getMediaById(backgroundImageId).subscribe((mediaRes) => {
            this.backgroundImage = mediaRes.source_url;
          });
        }
          // first section main Image
        const mainmageId = this.service.acf?.main_image;
        if (mainmageId) {
          this.wp.getMediaById(mainmageId).subscribe((mediaRes) => {
            this.mainImage = mediaRes.source_url;
          });
        }
        // first section video Image
           const videomageId = this.service.acf?.video_image;
        if (videomageId) {
          this.wp.getMediaById(videomageId).subscribe((mediaRes) => {
            this.videoImage = mediaRes.source_url;
          });
        }
        // second card Image
           const seconcardmageId = this.service.acf?.left_main_image;
        if (seconcardmageId) {
          this.wp.getMediaById(seconcardmageId).subscribe((mediaRes) => {
            this.secondcardleftImage = mediaRes.source_url;
          });
        }
         // second card video Image
           const seconcardVDmageId = this.service.acf?.left_video_image;
        if (seconcardVDmageId) {
          this.wp.getMediaById(seconcardVDmageId).subscribe((mediaRes) => {
            this.secondcardVedioleftImage = mediaRes.source_url;
          });
        }
      }
    if (this.service.acf?.benefits) {
      this.benefits = this.service.acf.benefits.map((b: any) => b.field_688c63539c27a);
    }
    if (this.service.acf?.curriculum_list) {
      this.curriculum_list = this.service.acf.curriculum_list.map((b: any) => b.field_688c676a1c3df);
      //console.log(this.service.acf.curriculum_list)
    }
   if (this.service.acf?.faq_repeater) {
      this.faqQ = this.service.acf.faq_repeater.map((b: any) => b.field_688c956b85ceb);
      console.log(this.service.acf.faq_repeater)
    }
 

           // ✅ Yahan video field check karo
        console.log('ACF Data:', this.service.acf);
        this.videoUrl = this.service.acf?.video_embed_url || '';
        this.introvideoUrl = this.service.acf?.video_iframe_url || '';


         this.loading = false;
    });
  }
  
}
 
}