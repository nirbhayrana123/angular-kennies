import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router'; 
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe';
import { Title, Meta } from '@angular/platform-browser'; 
import { WpService } from '../../../services/wp.service';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../not-found/not-found.component';

@Component({
  selector: 'app-courses-details',
  imports: [RouterModule, CommonModule, SafeUrlPipe, NotFoundComponent],
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.css']
})
export class CoursesDetailsComponent implements OnInit {
  service: any = { acf: {} };
  private route = inject(ActivatedRoute);
  private wp = inject(WpService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  loading = true;
  showNotFound = false;

  bannerHeading = '';
  courseImage = '';
  featuredImage = ''; 
  serviceLoaded = false;
  backgroundImage = ''; 
  mainImage = '';
  videoImage = '';
  secondcardVedioleftImage = '';
  secondcardleftImage = '';
  rdVedioleftImage = '';
  readyVedioleftImage = '';
  benefits: string[] = [];
  curriculum_list: string[] = [];
  videoUrl: string = ''; 
  introvideoUrl: string = ''; 
  faqQ: { question: string; answer: string; open?: boolean }[] = [];

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.setNotFound();
      return;
    }

    this.wp.getServiceBySlug(slug).subscribe((res) => {
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

      // Banner heading
      this.bannerHeading = this.service.acf?.banner_heading || ''; 

      // Featured image
      this.featuredImage = this.service._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

      // Dynamic media fields
      const mediaFields = [
        { key: 'courseImage', idField: 'course_image' },
        { key: 'backgroundImage', idField: 'background_img' },
        { key: 'mainImage', idField: 'main_image' },
        { key: 'videoImage', idField: 'video_image' },
        { key: 'secondcardleftImage', idField: 'left_main_image' },
        { key: 'secondcardVedioleftImage', idField: 'left_video_image' },
        { key: 'rdVedioleftImage', idField: 'ready_to_take_main_img' },
        { key: 'readyVedioleftImage', idField: 'ready_to_take_second_img' }
      ];

      mediaFields.forEach(({ key, idField }) => {
        const id = this.service.acf?.[idField];
        if (id) {
          this.wp.getMediaById(id).subscribe((mediaRes) => {
            (this as any)[key] = mediaRes.source_url;
          });
        }
      });

      // Benefits & curriculum
      if (this.service.acf?.benefits) {
        this.benefits = this.service.acf.benefits.map((b: any) => b.field_688c63539c27a);
      }
      if (this.service.acf?.curriculum_list) {
        this.curriculum_list = this.service.acf.curriculum_list.map((b: any) => b.field_688c676a1c3df);
      }

      // FAQ
      if (this.service.acf?.faq_repeater) {
        this.faqQ = this.service.acf.faq_repeater.map((b: any) => ({
          question: b.field_688c954685cea ?? '',
          answer: b.field_688c956b85ceb ?? '',
          open: false
        }));
      }

      // Video fields
      this.videoUrl = this.service.acf?.video_embed_url || '';
      this.introvideoUrl = this.service.acf?.video_iframe_url || '';

      this.loading = false;
    });
  }

  private setNotFound() {
    this.showNotFound = true;
    this.loading = false;
    this.titleService.setTitle('Page Not Found');
    this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  toggleFaq(index: number) {
    this.faqQ[index].open = !this.faqQ[index].open;
  }
}
