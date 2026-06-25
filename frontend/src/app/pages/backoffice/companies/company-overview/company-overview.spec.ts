import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOverview } from './company-overview';

describe('CompanyOverview', () => {
  let component: CompanyOverview;
  let fixture: ComponentFixture<CompanyOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
