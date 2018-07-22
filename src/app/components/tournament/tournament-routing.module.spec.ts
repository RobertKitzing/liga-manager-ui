import { TournamentRoutingModule } from './tournament-routing.module';

describe('TournamentRoutingModule', () => {
  let tournamentRoutingModule: TournamentRoutingModule;

  beforeEach(() => {
    tournamentRoutingModule = new TournamentRoutingModule();
  });

  it('should create an instance', () => {
    expect(tournamentRoutingModule).toBeTruthy();
  });
});
