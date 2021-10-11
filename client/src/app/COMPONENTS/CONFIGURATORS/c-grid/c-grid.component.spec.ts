import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CGridComponent } from './c-grid.component';

describe('CGridComponent', () => {
  let component: CGridComponent;
  let fixture: ComponentFixture<CGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
