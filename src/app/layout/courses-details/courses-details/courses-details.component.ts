import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseSliderComponent } from '../../../components/course-slider/course-slider/course-slider.component';
import { FaqSectionComponent } from '../../../components/faq-section/faq-section.component';

@Component({
  selector: 'app-courses-details',
  standalone: true,
  imports: [RouterModule, CourseSliderComponent, FaqSectionComponent],
  templateUrl: './courses-details.component.html',
  styleUrl: './courses-details.component.css'
})
export class CoursesDetailsComponent {

}
