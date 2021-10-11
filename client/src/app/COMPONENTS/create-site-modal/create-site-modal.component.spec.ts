import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSiteModalComponent } from './create-site-modal.component';

describe('CreateSiteModalComponent', () => {
  let component: CreateSiteModalComponent;
  let fixture: ComponentFixture<CreateSiteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSiteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
