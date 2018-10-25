import { TestBed, inject } from '@angular/core/testing';

import { TeamService } from './team.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Team, Client, CreateTeamBody } from '../../api';
import { of } from 'rxjs/internal/observable/of';

describe('TeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [TeamService]
    });
  });

  it('should be created', inject([TeamService], (service: TeamService) => {
    expect(service).toBeTruthy();
  }));

  it('should save Team[] to localStorage', inject([TeamService], (service: TeamService) => {
    const testTeams: Team[] = new Array<Team>();
    testTeams.push(new Team({ name: 'TestTeam' }));
    const localStorageSpy = spyOn(Object.getPrototypeOf(localStorage), 'setItem');
    service.teams = testTeams;
    expect(localStorageSpy).toHaveBeenCalledWith('TEAMS', JSON.stringify(testTeams));
  }));

  it('should call createTeam on addNewTeam', inject([TeamService],
    async (service: TeamService) => {
      const createTeamsSpy = spyOn(TestBed.get(Client), 'createTeam').and.returnValue(of());
      const teamName = 'test';
      service.addNewTeam(teamName);
      expect(createTeamsSpy).toHaveBeenCalledWith(new CreateTeamBody({ name: teamName }));
    }));
});
