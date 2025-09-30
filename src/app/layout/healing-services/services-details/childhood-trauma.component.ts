import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { EmotionalswiperComponent } from '../../../components/emotionalswiper/emotionalswiper.component'; 
import { Title, Meta } from '@angular/platform-browser'; 
import { WpService } from '../../../services/wp.service';
import { CommonModule } from '@angular/common'; 
import { NotFoundComponent } from '../../not-found/not-found.component';

@Component({
  selector: 'app-childhood-trauma',
  standalone: true,
  imports: [RouterModule, EmotionalswiperComponent, CommonModule, NotFoundComponent],
  templateUrl: './childhood-trauma.component.html',
  styleUrls: ['./childhood-trauma.component.css']
})
export class ChildhoodTraumaComponent implements OnInit {
  [key: string]: any; 
  service: any = { acf: {} };
  loading = true;
  showNotFound = false;

  bannerHeading = '';
  courseImage = '';
  featuredImage = ''; 
  cardImage1 = '';
  cardImage2 = '';
  cardImage3 = '';
  postcardImage1 = '';
  postcardImage2 = '';
  postcardicfImage = '';

  private route = inject(ActivatedRoute);
  private wp = inject(WpService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.setNotFound();
      return;
    }

    this.wp.gethealingServicesSlug(slug).subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          this.setNotFound();
          return;
        }

        this.service = res[0];

        // ✅ Yoast SEO data
        const yoast = this.service.yoast_head_json;
        if (yoast) {
          this.titleService.setTitle(yoast.title || this.service.title.rendered);
          this.metaService.updateTag({
            name: 'description',
            content: yoast.description || this.service.excerpt.rendered
          });
          this.metaService.updateTag({
            property: 'og:image',
            content: yoast.og_image?.[0]?.url || ''
          });
        }

        // Banner Heading & featured image
        this.bannerHeading = this.service.acf?.banner_heading || ''; 
        this.featuredImage = this.service._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

        // Load all images
        this.loadImages();

        this.loading = false;
      },
      error: () => this.setNotFound()
    });
  }

  private loadImages() {
    const imageFields = [
      { key: 'courseImage', idField: 'course_image' },
      { key: 'cardImage1', idField: 'healing_service_card_one_image' },
      { key: 'cardImage2', idField: 'healing_service_card_tow_image' },
      { key: 'cardImage3', idField: 'healing_service_card_three_image' },
      { key: 'postcardImage1', idField: 'post_card_one_image' },
      { key: 'postcardImage2', idField: 'post_card_tow_image' },
      { key: 'postcardicfImage', idField: 'post_card_tow_ifc_image' }
    ];

    imageFields.forEach(({ key, idField }) => {
      const id = this.service.acf?.[idField];
      if (id) {
        this.wp.getMediaById(id).subscribe((mediaRes) => {
          this[key] = mediaRes.source_url;
        });
      }
    });
  }

  private setNotFound() {
    this.showNotFound = true;
    this.loading = false;
    this.titleService.setTitle('Page Not Found');
    this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
