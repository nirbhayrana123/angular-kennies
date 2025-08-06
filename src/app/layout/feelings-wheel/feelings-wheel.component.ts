import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-feelings-wheel',
  standalone: true,
  imports: [],
  templateUrl: './feelings-wheel.component.html',
  styleUrls: ['./feelings-wheel.component.css']
})
export class FeelingsWheelComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Feelings Wheel - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'The Feelings Wheel will help you identify how you are feeling so you can recognize how the unhealed pain from the past is being relived...',
    });
  }
}
