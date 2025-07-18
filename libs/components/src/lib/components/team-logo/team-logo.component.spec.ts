import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLogoComponent } from './team-logo.component';
import { provideApi } from '@liga-manager-api/openapi';

describe('TeamLogoComponent', () => {
    let component: TeamLogoComponent;
    let fixture: ComponentFixture<TeamLogoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TeamLogoComponent],
            providers: [
                provideApi({}),
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(TeamLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
  
});
