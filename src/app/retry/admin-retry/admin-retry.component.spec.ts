import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetryComponent } from './admin-retry.component';

describe('AdminRetryComponent', () => {
  let component: AdminRetryComponent;
  let fixture: ComponentFixture<AdminRetryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRetryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
