import env from "../env";
import { Mixpanel } from "./mixpanel";

let isProd = env.env === "prod";
// let isProd = true; //dev testing

export default class Analytics {
  static track(event, additionalData = null) {
    if (isProd) {
      //track on mixpanel
      Mixpanel.track(event);

      //and also on GTM

      let gtmEvent = {
        event: `gtm_${event}`
      };

      if (additionalData) {
        gtmEvent = { ...gtmEvent, ...additionalData };
      }

      // console.log(gtmEvent);

      window.dataLayer.push(gtmEvent);
    }
  }
}
