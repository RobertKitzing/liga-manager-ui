import { TestBed, inject, waitForAsync as  } from '@angular/core/testing';

import { TeamadminGuard } from './teamadmin.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ROUTES } from '../../app-routing.module';

describe('TeamadminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(APP_ROUTES)
      ],
      providers: [TeamadminGuard]
    });
  });

  it('should ...', inject([TeamadminGuard], (guard: TeamadminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
