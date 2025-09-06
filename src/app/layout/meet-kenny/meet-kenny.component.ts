import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
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
export class MeetKennyComponent  implements OnInit, OnDestroy {
  isExpanded = false;
 isBrowser: boolean;  
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

  
  constructor(private titleService: Title, private metaService: Meta, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);  // 👈 set value
  }
  ngOnDestroy(): void {
     this.audios.forEach(a => {
      a.player.pause();
      a.isPlaying = false;
      a.player.currentTime = 0;
    });
  }

  ngOnInit() {
if (this.isBrowser) {
    this.titleService.setTitle('Meet Kenny Weiss | Coach for Relationship, Narcissistic Patterns & Self-Sabotage');
    this.metaService.updateTag(
      {
        name: 'description',
        content: `Struggling with childhood wounds, codependency, or self-sabotage? Meet Kenny Weiss, a coach who helps you break cycles and build emotional strength.`,
      },
      "name='description'"
    );
  }
    this.audios.forEach((a, i) => {
      a.player.src = a.url;
      // Jab audio khatam ho, icon reset ho jaye
      a.player.addEventListener('ended', () => {
        this.audios[i].isPlaying = false;
      });
    }); }

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
