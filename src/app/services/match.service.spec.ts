import { TestBed, inject } from '@angular/core/testing';

import { MatchService } from './match.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Client, Match_day } from '../../api';
import { MatchViewModel } from '../models/match.viewmodel';
import { of } from 'rxjs/internal/observable/of';

describe('MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MatchService]
    });
  });

  it('should be created', inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));

  it('should call getMatches (all) on getMatchesInSeason', inject([MatchService],
    async (service: MatchService) => {
      const seasonId = 'season';
      const spy = spyOn(TestBed.get(Client), 'getMatches').and.returnValue(of(new Array<MatchViewModel>()));
      const t = await service.getMatchesInSeason(seasonId);
      expect(spy).toHaveBeenCalledWith(seasonId, undefined, undefined, undefined);
  }));

  it('should call getMatches (matchday) on getMatchesInSeason', inject([MatchService],
    async (service: MatchService) => {
      const seasonId = 'season';
      const matchDayId = 'matchday';
      const teamId = 'team';
      const spy = spyOn(TestBed.get(Client), 'getMatches').and.returnValue(of(new Array<MatchViewModel>()));
      const t = await service.getMatchesInSeason(seasonId, teamId, matchDayId);
      expect(spy).toHaveBeenCalledWith(seasonId, undefined, teamId, matchDayId);
  }));

  it('should call getMatchDaysInSeason on getMatchDaysInSeason', inject([MatchService],
    async (service: MatchService) => {
      const seasonId = 'season';
      const spy = spyOn(TestBed.get(Client), 'getMatchDaysInSeason').and.returnValue(of(new Array<Match_day>()));
      const t = await service.getMatchDaysInSeason(seasonId);
      expect(spy).toHaveBeenCalledWith(seasonId);
  }));

  it('should call getMatches (all) on getMatchesInTournament', inject([MatchService],
    async (service: MatchService) => {
      const tournamentId = 'tournament';
      const spy = spyOn(TestBed.get(Client), 'getMatches').and.returnValue(of(new Array<MatchViewModel>()));
      const t = await service.getMatchesInTournament(tournamentId);
      expect(spy).toHaveBeenCalledWith(undefined, tournamentId, undefined, undefined);
  }));

  it('should call getMatches (matchday) on getTournamentInSeason', inject([MatchService],
    async (service: MatchService) => {
      const tournamentId = 'tournament';
      const matchDayId = 'matchday';
      const teamId = 'team';
      const spy = spyOn(TestBed.get(Client), 'getMatches').and.returnValue(of(new Array<MatchViewModel>()));
      const t = await service.getMatchesInTournament(tournamentId, teamId, matchDayId);
      expect(spy).toHaveBeenCalledWith(undefined, tournamentId, teamId, matchDayId);
  }));

  it('should call getRoundsInTournament on getRoundsInTournament', inject([MatchService],
    async (service: MatchService) => {
      const tournamentId = 'season';
      const spy = spyOn(TestBed.get(Client), 'getRoundsInTournament').and.returnValue(of(new Array<Match_day>()));
      const t = await service.getRoundsInTournament(tournamentId);
      expect(spy).toHaveBeenCalledWith(tournamentId);
  }));
});
