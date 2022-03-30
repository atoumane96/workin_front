import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveformulaireComponent } from './archiveformulaire.component';

describe('ArchiveformulaireComponent', () => {
  let component: ArchiveformulaireComponent;
  let fixture: ComponentFixture<ArchiveformulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveformulaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveformulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
