import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOverCrowdComponent } from './edit-over-crowd.component';

describe('EditOverCrowdComponent', () => {
  let component: EditOverCrowdComponent;
  let fixture: ComponentFixture<EditOverCrowdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOverCrowdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOverCrowdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
