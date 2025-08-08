// src/app/services/wp.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WpService {
  private baseUrl = 'https://kennyweiss.net/cms/wp-json/wp/v2';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.baseUrl}/posts?_embed`);
  }

  getPost(id: number) {
    return this.http.get(`${this.baseUrl}/posts/${id}?_embed`);
  }

  /////////Contact
  sendForm(data: any) {
   const url = 'https://kennyweiss.net/cms/wp-json/contact-form-7/v1/contact-forms/573/feedback';
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  body.append('last-name', data.lastname);
  body.append('tel-572', data.phone); 
  body.append('your-message', data.message);
  // Required hidden fields
  body.append('_wpcf7', '573');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f573-p574-o1');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}
/////////pdf
/////////Contact
  sendFormRejected(data: any) {
   const url = 'https://kennyweiss.net/cms/wp-json/contact-form-7/v1/contact-forms/578/feedback';
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '578');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f578-p574-o2');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}
/////////pdf
/////////confidence
  sendFormconfidence(data: any) {
   const url = 'https://kennyweiss.net/cms/wp-json/contact-form-7/v1/contact-forms/580/feedback';
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '580');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f578-p574-o3');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}

/////////pdf
/////////Boundaries
  sendFormboundaries (data: any) {
   const url = 'https://kennyweiss.net/cms/wp-json/contact-form-7/v1/contact-forms/582/feedback';
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '582');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f582-p574-o4');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}

/////////Conquer Confrontation
  sendFormConquerConfrontation(data: any) {
   const url = 'https://kennyweiss.net/cms/wp-json/contact-form-7/v1/contact-forms/584/feedback';
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '584');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f584-p574-o5');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}
  
/////////Codependence
  sendFormCodependence(data: any) {
   const url = 'https://kennyweiss.net/cms/wp-json/contact-form-7/v1/contact-forms/586/feedback';
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '586');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f578-p574-o6');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}

/////////Feelings Wheel
  sendFormFeelingsWheel(data: any) {
   const url = 'https://kennyweiss.net/cms/wp-json/contact-form-7/v1/contact-forms/595/feedback';
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '595');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f578-p574-o7');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}


}
