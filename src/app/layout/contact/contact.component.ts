import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']   
})
export class ContactComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Contact Kenny Weiss - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'Face your pain and break free from self-destructive behaviors with a video response from Kenny, directed to you privately.',
    });
  }
}
