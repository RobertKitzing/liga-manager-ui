import { TestBed, inject } from '@angular/core/testing';

import { I18Service } from './i18.service';

describe('I18Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18Service]
    });
  });

  it('should be created', inject([I18Service], (service: I18Service) => {
    expect(service).toBeTruthy();
  }));
});
