import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-book-session',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './book-session.component.html',
  styleUrls: ['./book-session.component.css']   
})
export class BookSessionComponent  implements OnInit {
  isLoading = true;
  isBrowser:boolean;
  constructor(private titleService: Title, private metaService: Meta,
@Inject(PLATFORM_ID) private platformId: Object

  ) {
     this.isBrowser = isPlatformBrowser(this.platformId);
    // this.titleService.setTitle('Book a Session');
    // this.metaService.updateTag({
    //   name: 'description',
    //   content: '',
    // });
  }

 ngOnInit(): void {
 
 

if (this.isBrowser) {
    this.titleService.setTitle('Book a Session with Kenny Weiss | Overcome Emotional Struggles & Toxic Patterns');
    this.metaService.updateTag(
      {
        name: 'description',
        content: ` Struggling with childhood wounds, toxic patterns, or narcissistic relationships? Book a session with Kenny Weiss to strengthen yourself and your relationships.`,
      },
      "name='description'"
    );
  }

  }
 
 ngAfterViewInit(): void {
    // Step 1: Calendly script inject karo
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      // Step 2: Jab script load ho jaye, iframe ke load hone ka wait karo
      this.waitForIframeAndHideLoader();
    };
    document.body.appendChild(script);
  }

  private waitForIframeAndHideLoader() {
    const checkIframe = setInterval(() => {
      const iframe = document.querySelector<HTMLIFrameElement>('.calendly-inline-widget iframe');
      if (iframe) {
        iframe.addEventListener('load', () => {
          this.isLoading = false;
        });
        clearInterval(checkIframe);
      }
    }, 200);
  }
}
