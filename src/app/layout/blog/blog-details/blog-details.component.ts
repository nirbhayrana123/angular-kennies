// src/app/layout/blog-details/blog-details.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // ✅ Required for route param
import { RouterModule } from '@angular/router';
import { WpService } from '../../../services/wp.service';
import { Title, Meta } from '@angular/platform-browser';
import { CourseSliderComponent } from '../../../components/course-slider/course-slider/course-slider.component';


@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CourseSliderComponent], // ✅ CommonModule is required for *ngIf, etc.
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'] // ✅ Fix typo: should be style**Urls**
})
export class BlogDetailsComponent {
  route = inject(ActivatedRoute);
  wp = inject(WpService);
  titleService = inject(Title);
  metaService = inject(Meta);

    loading = true;
  post: any = null;
  courseImage = '';
  featuredImage = '';

  constructor() {  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.wp.getPost(id).subscribe((res: any) => {
      this.post = res;

      // Title & Meta
      this.titleService.setTitle(this.post.title.rendered);
      this.metaService.updateTag({
        name: 'description',
        content: this.post.excerpt?.rendered.replace(/<[^>]+>/g, '') || '',
      });

      // ACF custom field image
      this.courseImage = this.post.acf?.postimage || '';

      // Featured image
      this.featuredImage =
        this.post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

          this.loading = false;
    });
  }
}
