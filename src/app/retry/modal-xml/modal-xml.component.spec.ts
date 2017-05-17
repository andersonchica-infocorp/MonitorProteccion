import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalXmlComponent } from './modal-xml.component';

describe('ModalXmlComponent', () => {
  let component: ModalXmlComponent;
  let fixture: ComponentFixture<ModalXmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalXmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
