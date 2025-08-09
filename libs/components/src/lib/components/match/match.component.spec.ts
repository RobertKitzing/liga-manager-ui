import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchComponent } from './match.component';
import { STORAGE, UserService } from '@liga-manager-ui/services';
import { Injectable } from '@angular/core';
import { Match } from '@liga-manager-api/graphql';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@Injectable()
class UserServiceMock {}

describe('MatchComponent', () => {

    let fixture: ComponentFixture<MatchComponent>;
    let component: MatchComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatchComponent,
            ],
            providers: [
                provideHttpClient(),
                {
                    provide: STORAGE,
                    useValue: localStorage,
                },
                {
                    provide: UserService,
                    useClass: UserServiceMock,
                },
                provideRouter([]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MatchComponent);
        fixture.autoDetectChanges();
        component = fixture.componentInstance;
    });

    it('should init', () => {
        expect(component).toBeTruthy();
    })

    it('should mark home as winner', () => {
        component.markLooser = true;
        component.match = {
            home_score: 1,
            guest_score: 0,
        } as  Match;
        expect(component.isHomeWinner()).toBeTruthy();
    })

})
