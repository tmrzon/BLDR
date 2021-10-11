import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CWHeaderComponent } from './c-wheader.component';

describe('CWHeaderComponent', () => {
  let component: CWHeaderComponent;
  let fixture: ComponentFixture<CWHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CWHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CWHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
