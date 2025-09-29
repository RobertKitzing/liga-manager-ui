import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import 'jest-localstorage-mock';

setupZoneTestEnv({
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true,
});

jest.mock('fuzzysearch-ts', () => ({ fuzzysearch: jest.fn() }));
jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());
