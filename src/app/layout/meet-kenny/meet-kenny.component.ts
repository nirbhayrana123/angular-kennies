import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CourseSliderComponent } from '../../components/course-slider/course-slider/course-slider.component';

@Component({
  selector: 'app-meet-kenny',
  standalone: true,
  imports: [CommonModule,CourseSliderComponent],
  templateUrl: './meet-kenny.component.html',
  styleUrl: './meet-kenny.component.css'
})
export class MeetKennyComponent {
isExpanded = false;

  toggleKannyContent() {
    this.isExpanded = !this.isExpanded;
  }
}
