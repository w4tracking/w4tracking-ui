import { W4TRACKING_API_URL } from '../ngx-w4tracking';
import { ApiLocatorService } from './api-locator.service';

export function w4trackingApiUrlFactory(api: ApiLocatorService) {
    return api.w4trackingApiUrl;
}

export let w4trackingApiUrlProvider = {
    provide: W4TRACKING_API_URL,
    useFactory: w4trackingApiUrlFactory,
    deps: [ApiLocatorService]
};
