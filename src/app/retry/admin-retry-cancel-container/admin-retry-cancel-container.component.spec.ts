import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetryCancelContainerComponent } from './admin-retry-cancel-container.component';

describe('AdminRetryCancelContainerComponent', () => {
  let component: AdminRetryCancelContainerComponent;
  let fixture: ComponentFixture<AdminRetryCancelContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRetryCancelContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRetryCancelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
