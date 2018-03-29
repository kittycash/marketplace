// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  version: '(dev)',
  serverUrl: 'https://pre-staging.kittycash.com/api',
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'en-Test'
  ],
  showShell: false,
  recaptchaSiteKey: '6LfNe0wUAAAAAH15ICx6IAVxNBi9FaGOg9JY7tNG'
};
