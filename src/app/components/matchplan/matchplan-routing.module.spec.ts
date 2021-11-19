import { MatchplanRoutingModule } from './matchplan-routing.module';

describe('MatchplanRoutingModule', () => {
  let matchplanRoutingModule: MatchplanRoutingModule;

  beforeEach(() => {
    matchplanRoutingModule = new MatchplanRoutingModule();
  });

  it('should create an instance', () => {
    expect(matchplanRoutingModule).toBeTruthy();
  });
});
