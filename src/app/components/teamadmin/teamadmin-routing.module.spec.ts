import { TeamadminRoutingModule } from './teamadmin-routing.module';

describe('TeamadminRoutingModule', () => {
  let teamadminRoutingModule: TeamadminRoutingModule;

  beforeEach(() => {
    teamadminRoutingModule = new TeamadminRoutingModule();
  });

  it('should create an instance', () => {
    expect(teamadminRoutingModule).toBeTruthy();
  });
});
