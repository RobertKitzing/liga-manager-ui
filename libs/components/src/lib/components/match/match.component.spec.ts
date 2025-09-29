import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchComponent } from './match.component';
import { I18nService, STORAGE, UserService } from '@liga-manager-ui/services';
import { importProvidersFrom, Injectable } from '@angular/core';
import { aMatch } from '@liga-manager-api/graphql';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { Configuration } from '@liga-manager-api/openapi';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SelectedItemsState } from '@liga-manager-ui/states';

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
                provideStore([
                    SelectedItemsState,
                ]),
                provideHttpClient(),
                {
                    provide: STORAGE,
                    useValue: localStorage,
                },
                {
                    provide: UserService,
                    useClass: UserServiceMock,
                },
                {
                    provide: Configuration,
                    useValue: {},
                },
                provideRouter([]),
                DatePipe,
                importProvidersFrom(
                    TranslateModule.forRoot({
                        defaultLanguage: 'en-GB',
                    }),
                ),
                I18nService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MatchComponent);
        const match = aMatch();
        fixture.componentRef.setInput('match', match);
        fixture.detectChanges();
        component = fixture.componentInstance;
    });

    it('should init', () => {
        expect(component).toBeTruthy();
    });

    it('should mark home as winner', () => {
        fixture.componentRef.setInput('markLooser', true);
        const match = aMatch({ home_score: 1, guest_score: 0 });
        fixture.componentRef.setInput('match', match);
        fixture.detectChanges();
        expect(component.isHomeWinner()).toBeTruthy();
        expect(component.isGuestWinner()).toBeFalsy();
    });

    it('should mark guest as winner', () => {
        fixture.componentRef.setInput('markLooser', true);
        const match = aMatch({ home_score: 0, guest_score: 1 });
        fixture.componentRef.setInput('match', match);
        fixture.detectChanges();
        expect(component.isHomeWinner()).toBeFalsy();
        expect(component.isGuestWinner()).toBeTruthy();
    });

});
