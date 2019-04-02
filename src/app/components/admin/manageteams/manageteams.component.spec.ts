import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddteamComponent } from './addteam.component';
import { SharedModule } from '../../shared/shared.module';
import { TeamService } from '../../../services/team.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddteamComponent', () => {

  let component: AddteamComponent;
  let fixture: ComponentFixture<AddteamComponent>;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [
        AddteamComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call addNewTeam on TeamService on addNewTeam()',
  //   () => {
  //     const teamServiceSpy = spyOn(TestBed.get(TeamService), 'addNewTeam');
  //     component.addNewTeam('testName');
  //     expect(teamServiceSpy).toHaveBeenCalledWith('testName');
  //   });
});
