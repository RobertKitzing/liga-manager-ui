import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { STORAGE } from './storage.service';

describe('AuthenticationService', () => {

    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,
                {
                    provide: STORAGE,
                    useValue: localStorage,
                },
            ],
        }).compileComponents();
        service = TestBed.inject(AuthenticationService);
    });

    it('should init', () => {
        expect(service).toBeTruthy();
    })

})
