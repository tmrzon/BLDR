import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwLottieComponent } from './cw-lottie.component';

describe('CwLottieComponent', () => {
  let component: CwLottieComponent;
  let fixture: ComponentFixture<CwLottieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwLottieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwLottieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
