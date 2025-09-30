import { isPlatformBrowser,CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID,  } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CanonicalService } from '../../services/canonical.service';

@Component({
    selector: 'app-podcast',
    imports: [CommonModule , RouterModule,],
    templateUrl: './podcast.component.html',
    styleUrl: './podcast.component.css'
})

export class PodcastComponent {
  isBrowser:boolean
  constructor(private titleService: Title, private metaService: Meta, @Inject(PLATFORM_ID) private platformId: Object,private canonical: CanonicalService) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

   ngOnInit() { 
    this.titleService.setTitle(' Heal the Hurt Podcast | Emotional Authenticity with Kenny Weiss');
    this.metaService.updateTag(
      {
        name: 'description',
        content: ` Join Kenny Weiss on 'Heal the Hurt' to uncover tools for overcoming trauma, codependency, narcissistic abuse, and building emotional authenticity.`,
      },
      "name='description'"
    );
 
   this.canonical.setCanonical('https://kennyweiss.net/podcast/');
  }


}
