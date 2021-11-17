import { MatchplanModule } from './matchplan.module';

describe('MatchplanModule', () => {
  let matchplanModule: MatchplanModule;

  beforeEach(() => {
    matchplanModule = new MatchplanModule();
  });

  it('should create an instance', () => {
    expect(matchplanModule).toBeTruthy();
  });
});
