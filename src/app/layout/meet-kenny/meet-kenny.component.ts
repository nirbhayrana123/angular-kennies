import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CourseSliderComponent } from '../../components/course-slider/course-slider/course-slider.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meet-kenny',
  standalone: true,
  imports: [CommonModule, CourseSliderComponent, RouterModule],
  templateUrl: './meet-kenny.component.html',
  styleUrl: './meet-kenny.component.css'
})
export class MeetKennyComponent {
  isExpanded = false;

  audios = [
    {
      url: 'https://samples.audible.com/bk/acx0/105161/bk_acx0_105161_sample.mp3',
      player: new Audio(),
      isPlaying: false
    },
    {
      url: 'https://samples.audible.com/bk/acx0/385990/bk_acx0_385990_sample.mp3',
      player: new Audio(),
      isPlaying: false
    }
  ];

  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('About Kenny Weiss | Top Life Coaches | Life and Relationship Coach');
    this.metaService.updateTag({
      name: 'description',
      content: 'Kenny Weiss is an Emotional Authenticity Coach, Leading Personal Development Speaker, and The Author of Your Journey to Success.'
    });
  }

  ngOnInit() {
    this.audios.forEach((a, i) => {
      a.player.src = a.url;
      // Jab audio khatam ho, icon reset ho jaye
      a.player.addEventListener('ended', () => {
        this.audios[i].isPlaying = false;
      });
    });
  }

  toggleKannyContent() {
    this.isExpanded = !this.isExpanded;
  }

  toggleAudio(index: number) {
    // Sab audios pause karo except clicked one
    this.audios.forEach((a, i) => {
      if (i !== index) {
        a.player.pause();
        a.isPlaying = false;
        a.player.currentTime = 0;
      }
    });

    const audioItem = this.audios[index];
    if (audioItem.isPlaying) {
      audioItem.player.pause();
    } else {
      audioItem.player.play();
    }
    audioItem.isPlaying = !audioItem.isPlaying;
  }
}
