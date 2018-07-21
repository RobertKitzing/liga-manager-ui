import { TestBed, inject } from '@angular/core/testing';

import { PitchService } from './pitch.service';

describe('PitchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PitchService]
    });
  });

  it('should be created', inject([PitchService], (service: PitchService) => {
    expect(service).toBeTruthy();
  }));
});
