import { TestBed } from '@angular/core/testing';

import { GraphVisualService } from './graph-visual.service';

describe('GraphVisualsService', () => {
  let service: GraphVisualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphVisualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
