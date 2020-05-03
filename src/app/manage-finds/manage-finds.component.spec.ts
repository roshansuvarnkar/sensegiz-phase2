import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFindsComponent } from './manage-finds.component';

describe('ManageFindsComponent', () => {
  let component: ManageFindsComponent;
  let fixture: ComponentFixture<ManageFindsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFindsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
