import { W4TrackingUIConfig } from './w4tracking-ui-config';

export function w4trackingUIConfigFactory(): W4TrackingUIConfig {
  const answer = window['W4TrackingUIEnv'] || {};
  // lets filter out any values of 'undefined' in case an env var is missing in the template expression
  for (const key in answer) {
    if (answer[key]) {
      const value = answer[key];
      if (value === 'undefined') {
        answer[key] = '';
      }
    }
  }
  return answer as W4TrackingUIConfig;
}

export let w4trackingUIConfigProvider = {
  provide: W4TrackingUIConfig,
  useFactory: w4trackingUIConfigFactory,
  deps: []
};
