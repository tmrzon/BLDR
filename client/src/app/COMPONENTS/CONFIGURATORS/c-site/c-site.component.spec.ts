import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSiteComponent } from './c-site.component';

describe('CSiteComponent', () => {
  let component: CSiteComponent;
  let fixture: ComponentFixture<CSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
