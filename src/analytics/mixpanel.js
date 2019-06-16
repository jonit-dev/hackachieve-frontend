import mixpanel from 'mixpanel-browser';
import env from '../env.json';

mixpanel.init('733676f34daec2cfda7cd776112e88f5');

let env_check = env.env === 'prod';

let actions = {
    identify: (id) => {
        if (env_check) mixpanel.identify(id);
    },
    alias: (id) => {
        if (env_check) mixpanel.alias(id);
    },
    track: (name, props) => {
        if (env_check) mixpanel.track(name, props);
    },
    people: {
        set: (props) => {
            if (env_check) mixpanel.people.set(props);
        },
    },
};

export let Mixpanel = actions;
