import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpService } from '../../services/wp.service';
import { BlogDetailsComponent } from '../blog/blog-details/blog-details.component';
import { WdcDetailsComponent } from '../worst-day-cycle/wdc-details/wdc-details.component';
import { of, timeout, catchError } from 'rxjs';

@Component({
  selector: 'app-slug-handler',
  standalone: true,
  imports: [BlogDetailsComponent, WdcDetailsComponent],
  template: `
    <app-blog-details *ngIf="type === 'blog' && data" [post]="data"></app-blog-details>
    <app-wdc-details *ngIf="type === 'wdc' && data" [posting]="data"></app-wdc-details>
    <p *ngIf="loading">Loading...</p>
    <p *ngIf="error">{{ error }}</p>
  `
})
export class SlugHandlerComponent {
  route = inject(ActivatedRoute);
  wp = inject(WpService);

  type: 'blog' | 'wdc' | null = null;
  data: any = null;
  loading = true;
  error: string | null = null;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    const REQUEST_TIMEOUT = 4000; // 4 seconds

    // 🔹 Try WDC first
    this.wp.getwdcSlug(slug)
      .pipe(
        timeout(REQUEST_TIMEOUT),
        catchError(err => {
          console.error('WDC request failed', err);
          return of([]); // fallback to empty array
        })
      )
      .subscribe(res => {
        if (res.length) {
          this.type = 'wdc';
          this.data = res[0];
          this.loading = false;
        } else {
          // 🔹 Try blog if WDC not found
          this.wp.getpostSlug(slug)
            .pipe(
              timeout(REQUEST_TIMEOUT),
              catchError(err => {
                console.error('Blog request failed', err);
                return of([]); // fallback to empty array
              })
            )
            .subscribe(blogRes => {
              if (blogRes.length) {
                this.type = 'blog';
                this.data = blogRes[0];
              } else {
                this.error = 'Content not found';
              }
              this.loading = false;
            });
        }
      });
  }
}
