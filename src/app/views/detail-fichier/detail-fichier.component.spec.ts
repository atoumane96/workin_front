import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFichierComponent } from './detail-fichier.component';

describe('DetailFichierComponent', () => {
  let component: DetailFichierComponent;
  let fixture: ComponentFixture<DetailFichierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailFichierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
