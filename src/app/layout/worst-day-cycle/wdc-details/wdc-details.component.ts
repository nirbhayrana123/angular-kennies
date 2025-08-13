import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // ✅ Required for route param
import { RouterModule } from '@angular/router';
import { WpService } from '../../../services/wp.service';
import { Title, Meta } from '@angular/platform-browser'; 

@Component({
  selector: 'app-wdc-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wdc-details.component.html',
  styleUrl: './wdc-details.component.css'
})
export class WdcDetailsComponent {
  route = inject(ActivatedRoute);
  wp = inject(WpService);
  titleService = inject(Title);
  metaService = inject(Meta);

  loading = true;
  wdcpost: any = null;
  courseImage = '';
  featuredImage = '';

  constructor() {  }
ngOnInit() {
  this.courseImage = ''; 
  this.featuredImage = ''; 
  
  const slug = this.route.snapshot.paramMap.get('slug');
  
  if (slug) {
    this.wp.getwdcSlug(slug).subscribe((res) => {
      if (res.length > 0) {
        this.wdcpost = res[0];
        // Featured image
        this.featuredImage = this.wdcpost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

        // Course Image
        const courseImageId = this.wdcpost.acf?.course_image;
        if (courseImageId) {
          this.wp.getMediaById(courseImageId).subscribe((mediaRes) => {
            this.courseImage = mediaRes.source_url;
          });
        }
      }
         this.loading = false;
    });
  }
  
}
}
