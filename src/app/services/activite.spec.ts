import { TestBed } from '@angular/core/testing';
import { Activite } from './activite';

describe('Activite', () => {
  let service: Activite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Activite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
