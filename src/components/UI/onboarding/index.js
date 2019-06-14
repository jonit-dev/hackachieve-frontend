import React from 'react';
import ReactJoyride, {STATUS} from 'react-joyride';

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
                title: 'Our projects'
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
                title: 'Our projects'
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
                title: 'Our projects'
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
                title: 'Our projects'
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
                title: 'Our projects'
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
                title: 'Our projects'
            }

        ]
    };

    handleJoyrideCallback = data => {
        const {status, type, index} = data;

        console.log(data);

        if (status === 'skipped') {
            //if user skips onboarding tutorial, setup a token to avoid the user starting the onboarding again
            localStorage.setItem('onboarding', JSON.stringify(true));
        } else if (index >= 2) { //if user goes after step two (set short term goal), also avoid starting again
            localStorage.setItem('onboarding', JSON.stringify(true));
        }


        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            this.setState({run: false});
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