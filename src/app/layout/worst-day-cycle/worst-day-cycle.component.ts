import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WpService } from '../../services/wp.service';  


@Component({
  selector: 'app-worst-day-cycle',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './worst-day-cycle.component.html',
  styleUrls: ['./worst-day-cycle.component.css']   
})
export class WorstDayCycleComponent {
    wdcposts: any[] = []; 
   acfData: any;
   bannerHeading = ''; 
    loading = true;
  constructor(private titleService: Title, private metaService: Meta, private wp: WpService,) {
    this.titleService.setTitle('Worst Day Cycle | Life Coach | Personal Development Coach');
    this.metaService.updateTag({
      name: 'description',
      content: 'Absorbing childhood trauma leads to self-destructive behavior. Learn about breaking The Worst Day Cycle. Hire a personal development coach...',
    });
  }

    ngOnInit() {
    this.wp.getwdc().subscribe((data: any) => {
      this.wdcposts = data; 
       this.wdcposts = data.map((post: any) => {
      return {
        ...post,
        courseImage: post.acf?.postimage || '',
        featuredImage:
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      };
    });
      this.loading = false;
    });

 
   
  }

}
