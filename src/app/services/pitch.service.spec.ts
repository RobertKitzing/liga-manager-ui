import { TestBed, inject } from '@angular/core/testing';

import { PitchService } from './pitch.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PitchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [PitchService]
    });
  });

  it('should be created', inject([PitchService], (service: PitchService) => {
    expect(service).toBeTruthy();
  }));
});
