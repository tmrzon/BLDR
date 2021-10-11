import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwSliderComponent } from './cw-slider.component';

describe('CwSliderComponent', () => {
  let component: CwSliderComponent;
  let fixture: ComponentFixture<CwSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
