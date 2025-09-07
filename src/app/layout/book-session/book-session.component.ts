import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-session',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './book-session.component.html',
  styleUrls: ['./book-session.component.css']   
})
export class BookSessionComponent  implements OnInit {
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
    // Calendly script load karna
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);


     if (this.isBrowser) {
    const scriptId = 'elfsight-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }

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


}
