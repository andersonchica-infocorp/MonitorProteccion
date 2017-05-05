import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartconceptComponent } from './chartconcept.component';

describe('ChartconceptComponent', () => {
  let component: ChartconceptComponent;
  let fixture: ComponentFixture<ChartconceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartconceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartconceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
