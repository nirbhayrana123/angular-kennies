import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-meet-kenny',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meet-kenny.component.html',
  styleUrl: './meet-kenny.component.css'
})
export class MeetKennyComponent {

constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('About Kenny Weiss | Top Life Coaches | Life and Relationship Coach');
    this.metaService.updateTag({
      name: 'description',
      content: 'Kenny Weiss is an Emotional Authenticity Coach, Leading Personal Development Speaker, and The Author of Your Journey to Success.',
    });
  }
 


}
