import { TestBed, inject } from '@angular/core/testing';

import { TeamService } from './team.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Team } from '../../api';

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
});
