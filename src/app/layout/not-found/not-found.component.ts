import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StatusCodeService } from '../../services/status-code.service';
import { isPlatformServer } from '@angular/common';


@Component({
    selector: 'app-not-found',
    imports: [RouterModule],
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
constructor(private meta: Meta, private status: StatusCodeService) {


}

  ngOnInit(): void {
     this.status.setStatus(404); 
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}
