import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchComponent } from './match.component';
import { STORAGE } from '@liga-manager-ui/services';
import { provideApollo } from 'apollo-angular';
import { HttpLink, InMemoryCache } from '@apollo/client/core';

describe('MatchComponent', () => {

    let fixture: ComponentFixture<MatchComponent>;
    let component: MatchComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatchComponent,
            ],
            providers: [
                {
                    provide: STORAGE,
                    useValue: localStorage,
                },
                provideApollo(() => ({ link: new HttpLink(), cache: new InMemoryCache() })),
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
        expect(component.isHomeWinner()).toBeTruthy();
    })

})
