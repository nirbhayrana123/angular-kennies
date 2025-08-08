import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  email = '';
  message = '';

  constructor(private http: HttpClient) {}

  submitSubscribe() {
    const url = 'https://kennyweiss.net/cms/wp-json/contact-form-7/v1/contact-forms/607/feedback';

    const body = new FormData();
    body.append('your-email', this.email);
    body.append('_wpcf7', '607');
    body.append('_wpcf7_version', '6.1.1');
    body.append('_wpcf7_locale', 'en_US');
    body.append('_wpcf7_unit_tag', 'wpcf7-f600-p123-o8');
    body.append('_wpcf7_container_post', '123');
    body.append('_wpcf7_posted_data_hash', '');

    this.http.post(url, body).subscribe({
      next: (res: any) => {
        if (res.status === 'mail_sent') {
          this.message = '✅ Subscribed successfully!';
          this.email = '';
        } else {
          this.message = '⚠️ ' + res.message;
        }
      },
      error: () => {
        this.message = '❌ Failed to subscribe';
      }
    });
  }
}



