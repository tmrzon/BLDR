import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSitesComponent } from './all-sites.component';

describe('AllSitesComponent', () => {
  let component: AllSitesComponent;
  let fixture: ComponentFixture<AllSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
