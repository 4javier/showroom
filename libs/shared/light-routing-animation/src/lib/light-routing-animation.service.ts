import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightRoutingAnimationService {

  rendered$ = new Subject<void>()
  
  constructor() {}
}
