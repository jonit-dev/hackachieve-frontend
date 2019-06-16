import React from 'react';
import ReactJoyride, {STATUS} from 'react-joyride';
import Analytics from "../../analytics/Analytics";

export default class Joy extends React.Component {
    state = {

        run: false,
        steps: [
            {
                content: <h2>Let's begin our journey!</h2>,
                placement: 'center',
                locale: {skip: <strong aria-label="skip">S-K-I-P</strong>},
                target: 'body',
            },
            {
                content: 'Click here to create your first long term goal',
                placement: 'bottom',
                styles: {
                    options: {
                        width: 300
                    }
                },
                target: '.board-column-add.column-add-short-term-goal',
                title: 'Long Term Goal'
            },
            {
                content: 'Now, let\'s try to add a short term goal',
                placement: 'right',
                styles: {
                    options: {
                        width: 300
                    }
                },
                target: '.column-add-short-term-goal',
                title: 'Short Term Goal'
            },
            {
                content: 'You can click on the dropdowns, to create, edit or delete your goals',
                placement: 'right',
                styles: {
                    options: {
                        width: 300
                    }
                },
                target: '.ui.dropdown.column-dropdown',
                title: 'Change your Goals'
            },
            {
                content: 'Here you can filter your goals by status',
                placement: 'right',
                styles: {
                    options: {
                        width: 300
                    }
                },
                target: '.board-switch',
                title: 'Status filter'
            },
            {
                content: 'And here, you can filter by goal category',
                placement: 'right',
                styles: {
                    options: {
                        width: 300
                    }
                },
                target: '#board-dropdown',
                title: 'Category filter'
            },
            {
                content: 'Ah! And don\'t forget to use these buttons to start, complete and prioritize your goals',
                placement: 'right',
                styles: {
                    options: {
                        width: 300
                    }
                },
                target: '.column-card-button',
                title: 'Actions'
            }

        ]
    };

    handleJoyrideCallback = data => {
        const {status, type, index, action} = data;

        console.log(data);


        switch(action) {

            case 'start':
                Analytics.track('onboarding_start', {
                    'eventCategory': 'onboarding',
                    'eventAction': 'onboarding_start',
                });
                break;

            case 'close':
                Analytics.track('onboarding_close', {
                    'eventCategory': 'onboarding',
                    'eventAction': 'onboarding_close',
                });
                break;

            default:
                break;
        }


        switch(status) {

            case 'skipped':
                //if user skips onboarding tutorial, setup a token to avoid the user starting the onboarding again
                // localStorage.setItem('onboarding', JSON.stringify(true));


                Analytics.track('onboarding_skipped', {
                    'eventCategory': 'onboarding',
                    'eventAction': 'onboarding_skipped',
                });
                break;

            case 'running':

                Analytics.track('onboarding_step', {
                    'eventCategory': 'onboarding',
                    'eventLabel': `onboarding_step - Step: ${index}`,
                    'eventAction': 'onboarding_step',
                    'eventValue': index
                });


                if (index >= 3) { //if user goes after step two (set short term goal), also avoid starting again

                    Analytics.track('onboarding_completed_basic', {
                        'eventCategory': 'onboarding',
                        'eventLabel': 'onboarding - first 3 steps',
                        'eventAction': 'onboarding_completed_basic',
                    });


                    //setup a cookie to avoid starting onboarding over again
                    localStorage.setItem('onboarding', JSON.stringify(true));
                }

                break;

            case 'finished':
                Analytics.track('onboarding_completed_full', {
                    'eventCategory': 'onboarding',
                    'eventAction': 'onboarding_completed_full',
                });
                break;

            default:
                break;

        }


        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            this.setState({run: false}); // if user finishes or skips, stop it from running
        }
        console.groupCollapsed(type);
        console.log(data); //eslint-disable-line no-console
        console.groupEnd();
    };


    render() {
        // const {run, steps} = this.state;
        const {steps} = this.state;

        return (
            <div className="app">
                <ReactJoyride
                    callback={this.handleJoyrideCallback}
                    continuous
                    run={true}
                    scrollToFirstStep
                    showSkipButton
                    steps={steps}
                    styles={{
                        options: {
                            zIndex: 10000,
                        }
                    }}
                />

            </div>
        );
    }
}