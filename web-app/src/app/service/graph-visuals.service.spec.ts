import { TestBed } from '@angular/core/testing';

import { GraphVisualsService } from './graph-visuals.service';

describe('GraphVisualsService', () => {
  let service: GraphVisualsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphVisualsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
