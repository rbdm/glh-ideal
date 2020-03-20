import { TestBed } from '@angular/core/testing';

import { LegalObjectService } from './legal-object.service';

describe('LegalObjectService', () => {
  let service: LegalObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
