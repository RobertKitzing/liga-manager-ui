import { TestBed } from '@angular/core/testing';

import { PublicHolidaysService } from './public-holidays.service';

describe('PublicHolidaysService', () => {
  let service: PublicHolidaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicHolidaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
