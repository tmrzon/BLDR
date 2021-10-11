import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderWithNumberComponent } from './slider-with-number.component';

describe('SliderWithNumberComponent', () => {
  let component: SliderWithNumberComponent;
  let fixture: ComponentFixture<SliderWithNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderWithNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderWithNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
