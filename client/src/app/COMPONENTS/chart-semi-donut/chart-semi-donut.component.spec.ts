import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSemiDonutComponent } from './chart-semi-donut.component';

describe('ChartSemiDonutComponent', () => {
  let component: ChartSemiDonutComponent;
  let fixture: ComponentFixture<ChartSemiDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSemiDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSemiDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
