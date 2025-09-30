import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule ,ActivatedRoute } from '@angular/router';
import { WpService } from '../../../services/wp.service';
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser'; 
import { CourseSliderComponent } from '../../../components/course-slider/course-slider/course-slider.component';
import { NotFoundComponent } from '../../not-found/not-found.component';

@Component({
    selector: 'app-wdc-details',
    standalone: true,
    imports: [CommonModule, RouterModule, CourseSliderComponent, NotFoundComponent],
    templateUrl: './wdc-details.component.html',
    styleUrls: ['./wdc-details.component.css']
})
export class WdcDetailsComponent {
  private route = inject(ActivatedRoute);
  private wp = inject(WpService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  @Input() posting: any;
  loading = true; 
  showNotFound = false;   // ✅ Not Found flag
  wdcpost: any = { acf: {} };
  courseImage = '';
  featuredImage = '';
  safeContent!: SafeHtml;  

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.courseImage = ''; 
    this.featuredImage = ''; 

    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.setNotFound();
      return;
    }

    this.wp.getwdcSlug(slug).subscribe((res: any) => {
      if (!res || res.length === 0) {
        this.setNotFound();
        return;
      }

      this.wdcpost = res[0];

      // ✅ Yoast SEO
      const yoast = this.wdcpost.yoast_head_json;
      if (yoast) {
        this.titleService.setTitle(yoast.title || this.wdcpost.title.rendered);
        this.metaService.updateTag({
          name: 'description',
          content: yoast.description || this.wdcpost.excerpt.rendered
        });
        this.metaService.updateTag({
          property: 'og:image',
          content: yoast.og_image?.[0]?.url || ''
        });
      }

      // Content sanitization
      let content = this.wdcpost.content.rendered;
      content = content.replace(
        /(https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))/g,
        `<iframe width="560" height="315" 
            src="https://www.youtube.com/embed/$2" 
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
         </iframe>`
      );
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(content);

      // Images
      this.featuredImage = this.wdcpost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
      const courseImageId = this.wdcpost.acf?.course_image;
      if (courseImageId) {
        this.wp.getMediaById(courseImageId).subscribe((mediaRes) => {
          this.courseImage = mediaRes.source_url;
        });
      }

      this.loading = false;
    });
  }

  private setNotFound() {
    this.showNotFound = true;
    this.loading = false;
    this.titleService.setTitle('Page Not Found');
    this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
