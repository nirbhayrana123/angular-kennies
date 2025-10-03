import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { WpService } from '../../../services/wp.service';
import { Title, Meta } from '@angular/platform-browser';
import { CourseSliderComponent } from '../../../components/course-slider/course-slider/course-slider.component';
import { EmbedYoutubePipe } from '../../../pipes/embed-youtube.pipe';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe'; 
import { NotFoundComponent } from '../../not-found/not-found.component';
import { CanonicalService } from '../../../services/canonical.service';

@Component({
  selector: 'app-blog-details',
  imports: [CommonModule, RouterModule, NotFoundComponent, SafeUrlPipe,  CourseSliderComponent, EmbedYoutubePipe],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent {
  post: any = null;
  loading = true;
  showNotFound = false;
  courseImage = '';
  featuredImage = '';

  private route = inject(ActivatedRoute);
  private wp = inject(WpService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  
  constructor(private canonical: CanonicalService) {
    
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.setNotFound();
      return;
    }
  if (slug) {
    this.canonical.setCanonical(`https://kennyweiss.net/${slug}`);
    this.wp.getpostSlug(slug).subscribe((res) => {
      if (!res || res.length === 0) {
        this.setNotFound();
        return;
      }

      this.post = res[0];

      // Yoast SEO
      const yoast = this.post.yoast_head_json;
      if (yoast) {
        this.titleService.setTitle(yoast.title || this.post.title.rendered);
        this.metaService.updateTag({
          name: 'description',
          content: yoast.description || this.post.excerpt.rendered
        });
        this.metaService.updateTag({
          property: 'og:image',
          content: yoast.og_image?.[0]?.url || ''
        });
      }

      this.courseImage = this.post.acf?.postimage || '';
      this.featuredImage = this.post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
      this.loading = false;
    });
  }
  }

  private setNotFound() {
    this.showNotFound = true;
    this.loading = false;
    this.titleService.setTitle('Page Not Found');
    this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
