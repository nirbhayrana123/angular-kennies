import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // 👈 Import this
import { CanonicalService } from '../../services/canonical.service';
import { Meta, Title } from '@angular/platform-browser';
@Component({
    selector: 'app-thank-you',
    imports: [],
    templateUrl: './thank-you.component.html',
    styleUrl: './thank-you.component.css'
})
export class ThankYouComponent {
    isBrowser: boolean;
constructor(private titleService: Title, 
  private metaService: Meta,   
  private canonical: CanonicalService,
  @Inject(PLATFORM_ID) private platformId: Object,
) {
  this.isBrowser = isPlatformBrowser(this.platformId);
  }
     
    ngOnInit() {  

    this.titleService.setTitle('Thank you');
    this.metaService.updateTag(
      {
        name: 'description',
        content: `Thank you for visiting our website`,
      },
      "name='description'"
    );
       this.canonical.setCanonical('https://kennyweiss.net/thank-you');
  }
}
