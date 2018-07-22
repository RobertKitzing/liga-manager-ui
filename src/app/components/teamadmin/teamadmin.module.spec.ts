import { TeamadminModule } from './teamadmin.module';

describe('TeamadminModule', () => {
  let teamadminModule: TeamadminModule;

  beforeEach(() => {
    teamadminModule = new TeamadminModule();
  });

  it('should create an instance', () => {
    expect(teamadminModule).toBeTruthy();
  });
});
