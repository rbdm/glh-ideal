import { TestBed } from '@angular/core/testing';

import { DataModelService } from './data-model.service';

describe('DataModelService', () => {
  let service: DataModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
