import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveChangesModalComponent } from './save-changes-modal.component';

describe('SaveChangesModalComponent', () => {
  let component: SaveChangesModalComponent;
  let fixture: ComponentFixture<SaveChangesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveChangesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveChangesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
