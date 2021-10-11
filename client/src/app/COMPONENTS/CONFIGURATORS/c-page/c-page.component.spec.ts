import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CPageComponent } from './c-page.component';

describe('CPageComponent', () => {
  let component: CPageComponent;
  let fixture: ComponentFixture<CPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
