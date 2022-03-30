import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeArchiveComponent } from './typeArchive.component';

describe('TypeComponent', () => {
  let component: TypeArchiveComponent;
  let fixture: ComponentFixture<TypeArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
