import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddBleIdComponent } from './admin-add-ble-id.component';

describe('AdminAddBleIdComponent', () => {
  let component: AdminAddBleIdComponent;
  let fixture: ComponentFixture<AdminAddBleIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddBleIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddBleIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
