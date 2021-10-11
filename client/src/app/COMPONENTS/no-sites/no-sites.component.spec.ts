import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSitesComponent } from './no-sites.component';

describe('NoSitesComponent', () => {
  let component: NoSitesComponent;
  let fixture: ComponentFixture<NoSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
