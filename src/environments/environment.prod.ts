export const environment = {
  production: true,
  apiUrl: window['env']['apiUrl'] || 'default',
  sonarUrl: window['env']['sonarUrl'] || 'default',
  debug: window['env']['debug'] || false,
};
