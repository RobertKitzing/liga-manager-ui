import { Component } from '@angular/core';
import { CypressSelectorDirective } from './cypress-selector.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    template: '<div [cySelector]="selector"></div>',
    imports: [CypressSelectorDirective],
})
class TestComponent {

    selector = 'black';

}

describe('CypressSelectorDirective', () => {

    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CypressSelectorDirective,
                TestComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        fixture.autoDetectChanges();
    });

    it('should init', () => {
        expect(fixture).toBeTruthy();
    })

    it('should add the right attr to the element', () => {
        const elements = fixture.debugElement.queryAll(By.directive(CypressSelectorDirective));
        expect(elements[0].attributes['data-cy']).toBe('black');
    })

})
