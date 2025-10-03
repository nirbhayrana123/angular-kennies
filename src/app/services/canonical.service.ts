import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {

  constructor(@Inject(DOCUMENT) private doc: Document,
              @Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Set canonical URL safely for SSR, prerender, and browser
   * @param url Full canonical URL, e.g. 'https://kennyweiss.net/courses'
   */
  setCanonical(url: string) {
    // Fallback to homepage if no URL provided
    let canonicalUrl = url || 'https://kennyweiss.net/';

    // Ensure trailing slash
    if (!canonicalUrl.endsWith('/')) canonicalUrl += '/';

    // Get or create <link rel="canonical">
    let link: HTMLLinkElement = this.doc.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);
  }

}
