import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { StatusCodeService } from '../../services/status-code.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor(
    private meta: Meta,
    private status: StatusCodeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.status.setStatus(404); // 👈 sirf SSR ke liye
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    }
  }
}
