import { Component, Inject, Optional, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response } from 'express';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(
    @Optional() @Inject(RESPONSE) private response: Response,
    private meta: Meta
  ) {
    // SSR only
    if (this.response) {
      this.response.status(404); // set HTTP 404 status for SSR
    } else {
      // fallback for CommonEngine SSR
      (globalThis as any).ngStatusCode = 404;
    }
  }

  ngOnInit(): void { 
    // Prevent SEO indexing
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
