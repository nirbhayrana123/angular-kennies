import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-worst-day-cycle',
  standalone: true,
  imports: [],
  templateUrl: './worst-day-cycle.component.html',
  styleUrls: ['./worst-day-cycle.component.css']   
})
export class WorstDayCycleComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Worst Day Cycle | Life Coach | Personal Development Coach');
    this.metaService.updateTag({
      name: 'description',
      content: 'Absorbing childhood trauma leads to self-destructive behavior. Learn about breaking The Worst Day Cycle. Hire a personal development coach...',
    });
  }
}
