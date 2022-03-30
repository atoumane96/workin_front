import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdashioComponent } from './ndashio.component';

describe('NdashioComponent', () => {
  let component: NdashioComponent;
  let fixture: ComponentFixture<NdashioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdashioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdashioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
