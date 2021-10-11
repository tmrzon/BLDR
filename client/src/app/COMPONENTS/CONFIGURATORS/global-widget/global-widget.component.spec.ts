import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalWidgetComponent } from './global-widget.component';

describe('GlobalWidgetComponent', () => {
  let component: GlobalWidgetComponent;
  let fixture: ComponentFixture<GlobalWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
