import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderFillComponent } from './slider-fill.component';

describe('SliderFillComponent', () => {
  let component: SliderFillComponent;
  let fixture: ComponentFixture<SliderFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
