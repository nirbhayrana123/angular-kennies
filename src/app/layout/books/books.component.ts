import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('books');
    this.metaService.updateTag({
      name: 'description',
      content: 'This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that&#039;s you, you&#039;re ready. Best Emotional Authenticity coach.',
    });
  }
}
