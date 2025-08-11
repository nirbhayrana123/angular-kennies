import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealingServicesComponent } from './healing-services.component';

describe('HealingServicesComponent', () => {
  let component: HealingServicesComponent;
  let fixture: ComponentFixture<HealingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealingServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
