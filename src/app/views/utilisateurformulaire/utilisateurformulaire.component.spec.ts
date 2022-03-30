import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurformulaireComponent } from './utilisateurformulaire.component';

describe('UtilisateurformulaireComponent', () => {
  let component: UtilisateurformulaireComponent;
  let fixture: ComponentFixture<UtilisateurformulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisateurformulaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurformulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
