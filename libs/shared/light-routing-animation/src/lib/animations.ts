import { trigger, transition, query, style, animate, keyframes } from "@angular/animations";

export const lightSlideLeftAnimation =
    trigger('lightSlideLeftAnimation', [
        transition('* => leaving', [
            query(':enter', style({ display: 'none' }), { optional: true }),
            query('[sr-lra-item]', [
                style({ display: 'block' }),
                animate('300ms', keyframes([
                    style({ transform: 'translateX(0%)' }),
                    style({ transform: 'translateX(-100%)' })
                ]))
            ], { optional: true }),
        ]),
        transition('leaving => entering', [
            query('[sr-lra-item]', [
                style({ display: 'block' }),
                animate('300ms', keyframes([
                    style({ transform: 'translateX(-100%)' }),
                    style({ transform: 'translateX(0%)' })
                ]))
            ], { optional: true })
        ])
    ])