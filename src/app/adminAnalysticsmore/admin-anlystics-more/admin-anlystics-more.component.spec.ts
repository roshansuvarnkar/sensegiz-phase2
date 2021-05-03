import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnlysticsMoreComponent } from './admin-anlystics-more.component';

describe('AdminAnlysticsMoreComponent', () => {
  let component: AdminAnlysticsMoreComponent;
  let fixture: ComponentFixture<AdminAnlysticsMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAnlysticsMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnlysticsMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
