import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const matchDayAnimation = trigger('matchDayAnimation', [
    transition(':increment', [
        group([
            query(':leave', [
                style({ position: 'relative', opacity: 1, translate: '0 calc( (-{{ length }}*100%) - ({{ length }}*8px) )' }),
                animate('.5s ease-out', style({ opacity: 0, translate: '100% calc( (-{{ length }}*100%) - ({{ length }}*8px) )' })),
            ],{ optional: true }),
            query(':enter',
                [style({ opacity: 0, translate: '-100%' }), animate('.5s ease-out', style({ opacity: 1, translate: '0' }))],
                { optional: true },
            ),
        ]),
    ]),
    transition(':decrement', [
        group([
            query(':leave', [
                style({ position: 'relative', opacity: 1, translate: '0 calc( (-{{ length }}*100%) - ({{ length }}*8px) )' }),
                animate('.5s ease-out', style({ opacity: 0, translate: '-100% calc( (-{{ length }}*100%) - ({{ length }}*8px) )' })),
            ],{ optional: true }),
            query(':enter',
                [style({ opacity: 0, translate: '100%' }), animate('.5s ease-out', style({ opacity: 1, translate: '0' }))],
                { optional: true },
            ),
        ]),
    ]),
]);
