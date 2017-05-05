import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportActualComponent } from './report-actual.component';

describe('ReportActualComponent', () => {
  let component: ReportActualComponent;
  let fixture: ComponentFixture<ReportActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
