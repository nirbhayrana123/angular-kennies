import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent {

constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Resources | Emotional Authenticity Coach | Emotion Coaching');
    this.metaService.updateTag({
      name: 'description',
      content: 'The Greatness Movement helps you understand “why” things aren’t working, but more importantly, “how” to change them.',
    });
  }

}
