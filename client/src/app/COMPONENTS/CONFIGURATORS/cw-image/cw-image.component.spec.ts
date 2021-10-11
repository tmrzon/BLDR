import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwImageComponent } from './cw-image.component';

describe('CwImageComponent', () => {
  let component: CwImageComponent;
  let fixture: ComponentFixture<CwImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
