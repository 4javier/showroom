import {
  style,
  animate,
  trigger,
  transition,
  state,
} from '@angular/animations';

export const shadowSlideLeftAnimation = [
  trigger('slideLeftAnimation', [
    state('in', style({ transform: 'translateX(0%)' })),
    state('out', style({ transform: 'translateX(-100%)' })),
    state('void', style({ transform: 'translateX(-100%)' })),
    transition('void => in', animate('500ms 0s ease-out')),
    transition('in => out', animate('500ms 0s ease-in')),
  ]),
];
