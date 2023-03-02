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