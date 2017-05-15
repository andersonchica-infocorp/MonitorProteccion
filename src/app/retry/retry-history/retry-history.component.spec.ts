import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryHistoryComponent } from './retry-history.component';

describe('RetryHistoryComponent', () => {
  let component: RetryHistoryComponent;
  let fixture: ComponentFixture<RetryHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetryHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
