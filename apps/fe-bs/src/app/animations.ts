import { trigger, transition, style, animate } from "@angular/animations";

export const fadeIn =
    trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate(300, style({ opacity: 1 }))
        ]),
    ])

export const fadeOut =
    trigger('fadeOut', [
        transition(':leave', [
            style({ opacity: 1 }),
            animate(300, style({ opacity: 0 }))
        ]),
    ])

export const ocBtnSlideInFromLeft =
    trigger('ocBtnSlideInFromLeft', [
        transition(':enter', [
            style({ opacity: 0.5, transform: 'translateX(-100%)' }),
            animate(200, style({ opacity: 1, transform: 'translateX(0%)' }))
        ]),
    ])

export const ocBtnSlideOutFromLeft =
    trigger('ocBtnSlideOutFromLeft', [
        transition(':leave', [
            style({ opacity: 1, transform: 'translateX(0%)' }),
            animate(200, style({ opacity: 0.5, transform: 'translateX(-100%)' }))
        ]),
    ])