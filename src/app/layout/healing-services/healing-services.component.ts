import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { WpService } from '../../services/wp.service';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../not-found/not-found.component';

 

@Component({
    selector: 'app-healing-services',
    standalone: true, 
    imports: [CommonModule, NotFoundComponent, RouterModule ],
    templateUrl: './healing-services.component.html',
    styleUrls: ['./healing-services.component.css']
})
export class HealingServicesComponent implements OnInit {
   healservices: any[] = [];
   acfData: any;
   bannerHeading = ''; 
  loading = true;
    showNotFound = false;

   constructor(private titleService: Title, private metaService: Meta, private wp: WpService,private route: ActivatedRoute) {
    this.titleService.setTitle('Begin Your Journey Course - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that&#039;s you, you&#039;re ready. Best Emotional Authenticity coach.',
    });
  }
 
  ngOnInit() {
        this.wp.gethealingServices().subscribe({
            next: (data) => {
                if (!data || data.length === 0) {
                    this.setNotFound();
                    return;
                }

                this.healservices = data.map((service: any) => ({
                    ...service,
                    courseImage: service.acf?.course_image_url || '',
                    featuredImage: service._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
                }));
                this.loading = false;
            },
            error: () => this.setNotFound()
        });
    }


        private setNotFound() {
        this.showNotFound = true;
        this.loading = false;
        this.titleService.setTitle('Page Not Found');
        this.metaService.updateTag({ name: 'robots', content: 'noindex, nofollow' });

     
    }

}
