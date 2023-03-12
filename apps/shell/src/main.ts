import { setRemoteDefinitions } from '@nrwl/angular/mf';

export let remoteUrls: Record<string, string> = {};

fetch('/assets/remote-urls.json')
  .then((res) => res.json())
  .then((definitions) => {
    remoteUrls = definitions;
    return setRemoteDefinitions(definitions);
  })
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
