import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenElementComponent } from './children-element.component';

describe('ChildrenElementComponent', () => {
  let component: ChildrenElementComponent;
  let fixture: ComponentFixture<ChildrenElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
