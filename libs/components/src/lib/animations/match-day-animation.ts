import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const matchDayAnimation = trigger('matchDayAnimation', [
    transition(':decrement', [
        group([
            query(':leave', [
                style({ opacity: 1, translate: '0' }),
                animate('.5s ease-out', style({ opacity: 0, translate: '100%' })),
            ],{ optional: true }),
            query(':enter',
                [style({ opacity: 0, translate: '-100%' }), animate('.5s ease-out', style({ opacity: 1, translate: '0' }))],
                { optional: true },
            ),
        ]),
    ]),
    transition(':increment', [
        group([
            query(':leave', [
                style({ opacity: 1, translate: '0' }),
                animate('.5s ease-out', style({ opacity: 0, translate: '-100%' })),
            ],{ optional: true }),
            query(':enter',
                [style({ opacity: 0, translate: '100%' }), animate('.5s ease-out', style({ opacity: 1, translate: '0' }))],
                { optional: true },
            ),
        ]),
    ]),
]);

// calc( (-{{ length }}*100%) - ({{ length }}*8px) )
// calc( (-{{ length }}*100%) - ({{ length }}*8px) )
// calc( (-{{ length }}*100%) - ({{ length }}*8px) )
// calc( (-{{ length }}*100%) - ({{ length }}*8px) )