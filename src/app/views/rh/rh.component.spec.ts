import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RHComponent } from './rh.component';

describe('RHComponent', () => {
  let component: RHComponent;
  let fixture: ComponentFixture<RHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
