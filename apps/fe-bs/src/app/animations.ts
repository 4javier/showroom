import { style, animate, trigger, transition } from "@angular/animations";

export const fromLeftInAnimation = [
    style({ transform: 'translateX(-100%)' }),
    animate('500ms 0s ease-out', style({ transform: 'translateX(0%)' }))
]

export const fromLeftOutAnimation = [
    style({ transform: 'translateX(0%)' }),
    animate('1000ms', style({ transform: 'translateX(-100%)' }))
]

export const fromLeft =
    trigger('fromLeft', [
        transition(':enter', fromLeftInAnimation),
        transition(':leave', fromLeftOutAnimation)
    ]);

