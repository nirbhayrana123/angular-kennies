import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmotionalswiperComponent } from '../../components/emotionalswiper/emotionalswiper.component';

@Component({
  selector: 'app-childhood-trauma',
  standalone: true,
  imports: [RouterModule, EmotionalswiperComponent],
  templateUrl: './childhood-trauma.component.html',
  styleUrl: './childhood-trauma.component.css'
})
export class ChildhoodTraumaComponent {

}
