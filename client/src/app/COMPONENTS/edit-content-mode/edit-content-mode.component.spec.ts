import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContentModeComponent } from './edit-content-mode.component';

describe('EditContentModeComponent', () => {
  let component: EditContentModeComponent;
  let fixture: ComponentFixture<EditContentModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContentModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
