import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { DarkMode, DarkModeAppearance, DarkModeGetterResult } from '@aparajita/capacitor-dark-mode'

const ls_key = 'ngx-webstorage|appearance';

export function getAppearancePref(): DarkModeGetterResult {
  const appearance = localStorage.getItem(ls_key) as DarkModeAppearance || 'system';
  return JSON.parse(appearance)
}

export function setAppearancePref(appearance: DarkModeAppearance) {
  localStorage.setItem(ls_key, appearance)
}

bootstrapApplication(AppComponent, appConfig)
  .then(
    () => {
      DarkMode.init({
        cssClass: 'dark',
        getter: getAppearancePref,
        setter: setAppearancePref,
      })
    },
  )
  .catch((err) => console.error(err));
