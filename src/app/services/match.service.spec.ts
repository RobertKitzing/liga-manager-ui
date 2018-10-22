import { TestBed, inject } from '@angular/core/testing';

import { MatchService } from './match.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MatchService]
    });
  });

  it('should be created', inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));
});
