import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwTextComponent } from './cw-text.component';

describe('CwTextComponent', () => {
  let component: CwTextComponent;
  let fixture: ComponentFixture<CwTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
