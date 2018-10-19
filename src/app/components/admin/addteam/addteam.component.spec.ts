import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddteamComponent } from './addteam.component';
import { SharedModule } from '../../../shared.module';
import { TeamService } from '../../../services/team.service';
import { TeamServiceMock } from 'src/app/services/team.service.mock';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppCoreModule } from '../../../app-core.module';

describe('AddteamComponent', () => {

  let component: AddteamComponent;
  let fixture: ComponentFixture<AddteamComponent>;
  let teamService: TeamService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        AppCoreModule,
        TranslateModule.forRoot()
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
