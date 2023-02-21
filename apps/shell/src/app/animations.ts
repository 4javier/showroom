import { trigger, transition, query, style, group, animate } from "@angular/animations";

export const fromLeftInAnimation = [
    style({ transform: 'translateX(-20%)' }),
    animate('500ms 0s ease-out', style({ transform: 'translateX(0%)' }))
]

export const fromLeftOutAnimation = [
    style({ transform: 'translateX(0%)' }),
    animate('500ms 0s ease-in', style({ transform: 'translateX(-20%)' }))
]

export const homeAnimationSequence =
  trigger('homeAnimationSequence', [
    transition('* => leaving', [
      query(':enter', style({ display: 'none' }), { optional: true }),
      group([
        query('.animate-from-left', fromLeftOutAnimation, { optional: true }),
      ])
    ]),
    transition('leaving => entering', [
      group([
        query('.animate-from-left', fromLeftInAnimation, { optional: true })
      ])
    ])
  ]);
