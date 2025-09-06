// src/app/layout/blog-details/blog-details.component.ts
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { RouterModule } from '@angular/router';
import { WpService } from '../../../services/wp.service';
import { Title, Meta } from '@angular/platform-browser';
import { CourseSliderComponent } from '../../../components/course-slider/course-slider/course-slider.component';
import { EmbedYoutubePipe } from '../../../pipes/embed-youtube.pipe';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CourseSliderComponent, EmbedYoutubePipe],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent {



  @Input() post: any;
  route = inject(ActivatedRoute);
  wp = inject(WpService);
  titleService = inject(Title);
  metaService = inject(Meta);

  loading = true;
  courseImage = '';
  featuredImage = '';

  constructor() {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.wp.getpostSlug(slug).subscribe((res) => {
        if (res.length > 0) {
          this.post = res[0];

          this.courseImage = this.post.acf?.postimage || '';

          this.featuredImage =
            this.post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

         const rawTitle = this.post.title.rendered || '';
          const blogTitle = rawTitle
            .replace(/<[^>]+>/g, '') // remove HTML tags
            .replace(/ - Kenny Weiss$/, '') // remove suffix if already there
            .trim();

          // ✅ Set dynamic <title>
          this.titleService.setTitle(blogTitle + ' - Kenny Weiss');

         // ✅ Meta description
          const description =
            this.post.acf?.meta_description || // prefer custom ACF meta description
            this.post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || // fallback to excerpt
            '';

          this.metaService.updateTag({
            name: 'description',
            content: description
          });

          console.log('Dynamic Title:', blogTitle + ' - Kenny Weiss');
          console.log('Meta Description:', description);
        

          console.log('Post:', this.post);
        }

        this.loading = false;
      });
    }



  const scriptId = 'elfsight-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }






  }
}
