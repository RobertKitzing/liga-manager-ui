import { TestBed, inject } from '@angular/core/testing';

import { I18Service } from './i18.service';
import { TranslateModule } from '@ngx-translate/core';

describe('I18Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [I18Service]
    });
  });

  it('should be created', inject([I18Service], (service: I18Service) => {
    expect(service).toBeTruthy();
  }));
});
