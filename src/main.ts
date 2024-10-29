/// <reference types="@angular/localize" />
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { loadTranslations } from '@angular/localize';
import localeDe from '@angular/common/locales/de';

import { AppModule } from './app/app.module';


async function setupLocale() {
    if (localStorage.getItem('locale') !== 'de') {
        return 'en-US';
    }
    const response = await fetch('messages.de.json');
    const result = await response.json();
    loadTranslations(result.translations);
    registerLocaleData(localeDe);
    return 'de';
}

setupLocale().then(localeValue => {
    platformBrowserDynamic([
        { provide: LOCALE_ID, useValue: localeValue }
    ])
        .bootstrapModule(AppModule, {
            ngZoneEventCoalescing: true
        })
        .catch(err => console.error(err));
});
