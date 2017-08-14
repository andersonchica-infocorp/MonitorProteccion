import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetryCancelFailFormComponent } from './admin-retry-cancel-fail-form.component';

describe('AdminRetryCancelFailFormComponent', () => {
  let component: AdminRetryCancelFailFormComponent;
  let fixture: ComponentFixture<AdminRetryCancelFailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRetryCancelFailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRetryCancelFailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
