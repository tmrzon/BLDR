import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwIframeComponent } from './cw-iframe.component';

describe('CwIframeComponent', () => {
  let component: CwIframeComponent;
  let fixture: ComponentFixture<CwIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
