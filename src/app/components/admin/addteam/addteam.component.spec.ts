import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddteamComponent } from './addteam.component';
import { SharedModule } from '../../../shared.module';
import { TeamService } from '../../../services/team.service';
import { TeamServiceMock } from 'src/app/services/team.service.mock';
import { TranslateModule } from '@ngx-translate/core';

describe('AddteamComponent', () => {

  let component: AddteamComponent;
  let fixture: ComponentFixture<AddteamComponent>;
  let teamService: TeamService;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        SharedModule
      ],
      declarations: [
        AddteamComponent
      ],
      providers: [
        {
          provide: TeamService,
          useClass: TeamServiceMock
        }
      ]
    })
      .compileComponents();

      teamService = TestBed.get(TeamService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addNewTeam on TeamService on addNewTeam()',
    () => {
      const teamServiceSpy = spyOn(teamService, 'addNewTeam');
      component.addNewTeam('testName');
      expect(teamServiceSpy).toHaveBeenCalledWith('testName');
    });
});
