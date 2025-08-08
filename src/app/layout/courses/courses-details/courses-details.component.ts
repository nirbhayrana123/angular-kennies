import { Component} from '@angular/core';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { CourseSliderComponent } from '../../../components/course-slider/course-slider/course-slider.component';
import { FaqSectionComponent } from '../../../components/faq-section/faq-section.component';
import { Title, Meta } from '@angular/platform-browser'; 
import { WpService } from '../../../services/wp.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-courses-details',
  standalone: true,
  imports: [RouterModule, CourseSliderComponent, FaqSectionComponent,CommonModule],
  templateUrl: './courses-details.component.html',
  styleUrl: './courses-details.component.css'
})
export class CoursesDetailsComponent {
services: any;
bannerHeading = '';
courseImage = '';
featuredImage = '';

constructor(private titleService: Title, private metaService: Meta, private wp: WpService,private route: ActivatedRoute) {
    this.titleService.setTitle('Begin Your Journey Course - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that&#039;s you, you&#039;re ready. Best Emotional Authenticity coach.',
    });
  };


ngOnInit() {
  const slug = this.route.snapshot.paramMap.get('slug');
console.log(slug);
  if (slug) {
    this.wp.getServiceBySlug(slug).subscribe((res) => {
      if (res.length > 0) {
        this.services = res[0];
        this.bannerHeading = this.services.acf?.banner_heading || '';
        this.courseImage = this.services.acf?.course_image || '';

        // Featured image from _embedded
        this.featuredImage = this.services._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
      }
    });
  }
}


}
