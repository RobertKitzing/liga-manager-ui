import { Directive, HostBinding, Input } from '@angular/core';
import { CySelectors } from './cy-selectors';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[cySelector]',
})
export class CypressSelectorDirective {

    @HostBinding('attr.data-cy')
    @Input() cySelector?: CySelectors;

}
