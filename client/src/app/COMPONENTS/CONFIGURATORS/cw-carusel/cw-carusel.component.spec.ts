import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwCaruselComponent } from './cw-carusel.component';

describe('CwCaruselComponent', () => {
  let component: CwCaruselComponent;
  let fixture: ComponentFixture<CwCaruselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwCaruselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwCaruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
