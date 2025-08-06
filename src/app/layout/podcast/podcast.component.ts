import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [],
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.css'
})

export class PodcastComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Podcast - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'Heal The Hurt is a podcast where Kenny Weiss shares the knowledge to reclaim your authentic self through the process of Emotional Authenticity.',
    });
  }}
