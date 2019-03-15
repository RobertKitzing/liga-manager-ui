import { TestBed } from '@angular/core/testing';

import { GraphqlSubscriptionService } from './graphql-subscription.service';

describe('GraphqlSubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqlSubscriptionService = TestBed.get(GraphqlSubscriptionService);
    expect(service).toBeTruthy();
  });
});
