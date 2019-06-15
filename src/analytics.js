import env from './env.json';
import {Mixpanel as mixpanel} from "../../../../mixpanel";


/**
 * Analytics: class responsible for tracking in multiple platforms at the same time (mixpanel, GTM, etc)
 */
class Analytics {

    static info() {
        return {
            isProduction: env.env === 'prod'
        }
    }


    /**
     * track: track an event in multiple platforms
     *
     * @param {string} event: event to be tracked
     * @returns void
     */
    static track(event, additionalParams = null) {
        if (env_check) { //if we're in production

            mixpanel.track(event); //mixpanel will only track the event.

            let gtmEvent = {
                'event': event
            };

            if (additionalParams) { //if needed, add extra params
                gtmEvent = {...gtmEvent, additionalParams}
            }

            dataLayer.push(gtmEvent);

        }
    }
}