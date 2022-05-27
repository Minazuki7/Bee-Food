const appConfig = {
  debug: false,
  API_URL: process.env.NX_API_URL,
  SUBSCRIPTION_URL: process.env.NX_SUBSCRIPTION_URL,
  ALLOW_CONSOLE_LOGS: process.env.NX_ALLOW_CONSOLE_LOGS,
};
const debugConfig = {
  debug: true,
  API_URL: process.env.NX_API_URL,
  SUBSCRIPTION_URL: process.env.NX_SUBSCRIPTION_URL,
  ALLOW_CONSOLE_LOGS: process.env.NX_ALLOW_CONSOLE_LOGS,
};
export const DEV = process.env.NODE_ENV === 'development';
export const config =
  process.env.NODE_ENV === 'development' ? debugConfig : appConfig;
export const ALLOW_CONSOLE_LOGS = config.ALLOW_CONSOLE_LOGS === 'true';

export default (SEVERITY = 'log', ...params: any) => {
  if (DEV || ALLOW_CONSOLE_LOGS) {
    switch (SEVERITY) {
      case 'error':
        console.error(...params);
        break;
      case 'warn':
        console.warn(...params);
        break;
      default:
        console.log(SEVERITY, ...params);
        break;
    }
  }
};
