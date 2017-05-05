import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListResultComponent } from './user-list-result.component';

describe('UserListResultComponent', () => {
  let component: UserListResultComponent;
  let fixture: ComponentFixture<UserListResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
