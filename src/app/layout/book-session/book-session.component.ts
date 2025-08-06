import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-session',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './book-session.component.html',
  styleUrls: ['./book-session.component.css']   
})
export class BookSessionComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Book a Session');
    this.metaService.updateTag({
      name: 'description',
      content: '',
    });
  }
}
