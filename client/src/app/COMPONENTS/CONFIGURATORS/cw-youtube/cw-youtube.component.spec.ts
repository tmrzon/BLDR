import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwYoutubeComponent } from './cw-youtube.component';

describe('CwYoutubeComponent', () => {
  let component: CwYoutubeComponent;
  let fixture: ComponentFixture<CwYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
