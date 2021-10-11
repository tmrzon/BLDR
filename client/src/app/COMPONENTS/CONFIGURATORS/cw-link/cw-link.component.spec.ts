import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwLinkComponent } from './cw-link.component';

describe('CwLinkComponent', () => {
  let component: CwLinkComponent;
  let fixture: ComponentFixture<CwLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
