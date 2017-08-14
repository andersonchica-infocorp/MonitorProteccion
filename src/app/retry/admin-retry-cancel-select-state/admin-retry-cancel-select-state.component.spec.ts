import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetryCancelSelectStateComponent } from './admin-retry-cancel-select-state.component';

describe('AdminRetryCancelSelectStateComponent', () => {
  let component: AdminRetryCancelSelectStateComponent;
  let fixture: ComponentFixture<AdminRetryCancelSelectStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRetryCancelSelectStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRetryCancelSelectStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
