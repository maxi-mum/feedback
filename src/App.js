import React, { Component } from 'react';
import Statistics from './components/Statistics';
import FeedbackOptions from './components/FeedbackOptions';
import Section from './components/Section';
import Notification from './components/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleChange = e => {
    const stateButtonName = e.target.textContent.toLowerCase();
    this.setState(prevState => {
      for (const key in prevState) {
        if (key === stateButtonName) {
          return { [key]: prevState[key] + 1 };
        }
      }
    });
  };

  countTotalFeedback() {
    let totalFeedback = 0;
    for (const key in this.state) {
      totalFeedback += this.state[key];
    }
    return totalFeedback;
  }

  countPositiveFeedbackPercentage(totalFeedback) {
    return totalFeedback === 0
      ? 0
      : Math.round((this.state.good * 100) / totalFeedback);
  }

  render() {
    const totalFeedback = this.countTotalFeedback();
    const positiveFeedback = this.countPositiveFeedbackPercentage(
      totalFeedback,
    );
    const { good, neutral, bad } = this.state;

    return (
      <>
        <Section title="Please leave your feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={this.handleChange}
          />
        </Section>
        <Section title="Statistics">
          {totalFeedback ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              totalFeedback={totalFeedback}
              positiveFeedback={positiveFeedback}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </>
    );
  }
}

export default App;
