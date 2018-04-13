// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serverUrl: '/api',
  wsServerUrl: 'ws://localhost:9898',
  defaultLanguage: 'de-DE',
  googleMapsApiKey: 'AIzaSyBo4kTaSyVs6hxw6PV7njib0k9muSx8YM0',
  supportedLanguages: [
    'en-US',
    'de-DE'
  ]
};
