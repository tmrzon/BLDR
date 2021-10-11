import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CColComponent } from './c-col.component';

describe('CColComponent', () => {
  let component: CColComponent;
  let fixture: ComponentFixture<CColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
