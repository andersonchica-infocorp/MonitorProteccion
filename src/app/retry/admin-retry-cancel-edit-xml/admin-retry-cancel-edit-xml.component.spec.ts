import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetryCancelEditXmlComponent } from './admin-retry-cancel-edit-xml.component';

describe('AdminRetryCancelEditXmlComponent', () => {
  let component: AdminRetryCancelEditXmlComponent;
  let fixture: ComponentFixture<AdminRetryCancelEditXmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRetryCancelEditXmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRetryCancelEditXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
