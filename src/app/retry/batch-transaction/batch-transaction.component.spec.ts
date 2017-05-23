import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchTransactionComponent } from './batch-transaction.component';

describe('BatchTransactionComponent', () => {
  let component: BatchTransactionComponent;
  let fixture: ComponentFixture<BatchTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
