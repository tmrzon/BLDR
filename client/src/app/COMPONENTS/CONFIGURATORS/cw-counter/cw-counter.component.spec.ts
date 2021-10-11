import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwCounterComponent } from './cw-counter.component';

describe('CwCounterComponent', () => {
  let component: CwCounterComponent;
  let fixture: ComponentFixture<CwCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
