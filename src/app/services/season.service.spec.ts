import { TestBed, inject } from '@angular/core/testing';

import { SeasonService } from './season.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeasonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [SeasonService]
    });
  });

  it('should be created', inject([SeasonService], (service: SeasonService) => {
    expect(service).toBeTruthy();
  }));
});
