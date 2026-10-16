import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultActivite } from './consult-activite';

describe('ConsultActivite', () => {
  let component: ConsultActivite;
  let fixture: ComponentFixture<ConsultActivite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultActivite],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultActivite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
