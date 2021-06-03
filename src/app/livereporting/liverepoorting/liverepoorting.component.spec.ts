import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiverepoortingComponent } from './liverepoorting.component';

describe('LiverepoortingComponent', () => {
  let component: LiverepoortingComponent;
  let fixture: ComponentFixture<LiverepoortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiverepoortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiverepoortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
