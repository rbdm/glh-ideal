import { TestBed } from '@angular/core/testing';

import { GlobalSelectionService } from './global-selection.service';

describe('GloballySelectedService', () => {
  let service: GlobalSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
