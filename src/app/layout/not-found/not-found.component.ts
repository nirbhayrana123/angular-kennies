import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-not-found',
    imports: [RouterModule],
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
constructor(private meta: Meta) {}

  ngOnInit(): void {
    // 404 page ke liye meta noindex, nofollow lagana
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
