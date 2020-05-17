import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCountViewComponent } from './home-count-view.component';

describe('HomeCountViewComponent', () => {
  let component: HomeCountViewComponent;
  let fixture: ComponentFixture<HomeCountViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCountViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCountViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
