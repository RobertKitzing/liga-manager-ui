import { Directive, HostBinding, Input } from '@angular/core';
import { CySelectors } from './cy-selectors';

@Directive({
    selector: '[cySelector]',
})
export class CypressSelectorDirective {

    @HostBinding('attr.data-cy')
    @Input() cySelector?: CySelectors;

}
