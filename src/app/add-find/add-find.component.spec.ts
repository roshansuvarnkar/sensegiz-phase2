import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFindComponent } from './add-find.component';

describe('AddFindComponent', () => {
  let component: AddFindComponent;
  let fixture: ComponentFixture<AddFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
