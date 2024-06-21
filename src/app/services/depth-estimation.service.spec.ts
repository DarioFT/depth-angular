import { TestBed } from '@angular/core/testing';

import { DepthEstimationService } from './depth-estimation.service';

describe('DepthEstimationService', () => {
  let service: DepthEstimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepthEstimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
