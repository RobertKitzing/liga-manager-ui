import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTournamentRoundComponent } from './edit-tournament-round.component';

describe('EditTournamentRoundComponent', () => {

    let fixture: ComponentFixture<EditTournamentRoundComponent>;
    let component: EditTournamentRoundComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EditTournamentRoundComponent,
            ],
            providers: [
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(EditTournamentRoundComponent);
        fixture.autoDetectChanges();
        component = fixture.componentInstance;
    });

    it('should init', () => {
        expect(component).toBeTruthy();
    })

})
