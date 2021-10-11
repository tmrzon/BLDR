import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwAccordionComponent } from './cw-accordion.component';

describe('CwAccordionComponent', () => {
  let component: CwAccordionComponent;
  let fixture: ComponentFixture<CwAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
