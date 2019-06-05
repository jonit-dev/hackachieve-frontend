import React from 'react';
import ReactJoyride,  { STATUS }  from 'react-joyride';

export default class Joy extends React.Component {
  state = {
    
    run: false,
    steps: [
      {
        content: <h2>Let's begin our journey!</h2>,
        placement: 'center',
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        target: 'body',
      },
      {
        content: 'These are our super awesome projects!',
        placement: 'bottom',
        styles: {
          options: {
            width: 300
          }
        },
        target: '.board-columns',
        title: 'Our projects'
      },
      {
        content: 'These are our super awesome projects!',
        placement: 'bottom',
        styles: {
          options: {
            width: 300
          }
        },
        target: '.column-dropdown',
        title: 'Our projects'
      },
     
    ]
  };

  handleJoyrideCallback = data => {
    const { status, type } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      this.setState({ run: false });
    }
    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };


  render () {
    const { run, steps } = this.state;

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