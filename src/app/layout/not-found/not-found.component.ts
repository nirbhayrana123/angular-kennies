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
    // ✅ This runs only on server-side render
    if (typeof window === 'undefined') {
      // Flag for Angular Universal → Express bridge
      (globalThis as any).ngStatusCode = 404;

      // Directly set response status if Express response available
      if (this.response) {
        this.response.status(404);
      }
    }
  }

  ngOnInit(): void {
    // ✅ Prevents Google from indexing this "soft 404"
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
