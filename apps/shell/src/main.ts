import { setRemoteDefinitions } from '@nrwl/angular/mf';
import { setRemoteUrls } from './app/app.remote-provider';

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => {
    setRemoteUrls(definitions);
    return setRemoteDefinitions(definitions);
  })
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
