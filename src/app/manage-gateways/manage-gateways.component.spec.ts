import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGatewaysComponent } from './manage-gateways.component';

describe('ManageGatewaysComponent', () => {
  let component: ManageGatewaysComponent;
  let fixture: ComponentFixture<ManageGatewaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGatewaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGatewaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
