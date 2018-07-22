import { TournamentModule } from './tournament.module';

describe('TournamentModule', () => {
  let tournamentModule: TournamentModule;

  beforeEach(() => {
    tournamentModule = new TournamentModule();
  });

  it('should create an instance', () => {
    expect(tournamentModule).toBeTruthy();
  });
});
