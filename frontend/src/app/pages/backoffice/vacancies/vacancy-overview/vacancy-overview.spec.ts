import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyOverview } from './vacancy-overview';

describe('VacancyOverview', () => {
  let component: VacancyOverview;
  let fixture: ComponentFixture<VacancyOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
