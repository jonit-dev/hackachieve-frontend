import React from "react";
import Helmet from "react-helmet";

const FAQ = props => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Hackachieve | FAQ</title>
        <meta
          name="description"
          content="In our FAQ you will be able to solve your most important questions about our goal setting software."
        />
      </Helmet>

      <div className="site-wrap internal-page">
        <div className="ui text container privacy">
          <h1>Frequently Asked Questions</h1>

          <div className="ui divider"></div>

          <h5>What is Hackachieve?</h5>
          <p>
            Hackachieve is a goal setting software that assists you in defining
            a short term or long term goal regarding your business or even
            personal life. It's inspired by kanban and SCRUM methodologies to
            make you achieve even more in a short period.
          </p>

          <h5>Can it be used to manage a team?</h5>
          <p>
            Absolutely! In Hackachieve you're able to delegate tasks or goals to
            other team members that will work together with you towards a common
            goal.
          </p>

          <h5>Is Hackachieve Free?</h5>
          <p>
            Yes! We have a free version with many functionalities and a premium
            subscription if you want extended and exclusive features.
          </p>

          <h5>
            What's the difference between a task, goal and a checklist inside
            Hackachieve?
          </h5>
          <p>
            <ul>
              <li>
                <strong>Short-term goals:</strong> Can be accomplished in a
                short period of time (generally less than 3 months) and are
                represented by <strong>cards</strong>.
              </li>

              <li>
                <strong>Long-term goals:</strong> Long-term goals generally span
                across multiple months (> 3 months) and can be accomplished by
                completing many different short-term goals. They're visually
                represented by <strong>columns</strong>.
              </li>
              <li>
                <strong>Tasks:</strong> It's simply something to be done, that
                won't necessarily move you towards your goals. They're small,
                short, and generally are just part of your project's workflow. A
                task can be something like "clear email list" or "Call a
                particular customer".
              </li>
              <li>
                <strong>Checklist:</strong> A collection of steps that need to
                be done to accomplish a particular short-term goal.
              </li>
            </ul>
          </p>

          <h5>How Hackachive is different than other similar solutions?</h5>
          <p>
            Our system comes with a framework that you can use to connect and
            organize your goals, in a collaborative team-based environment.
            Other solutions generally adopt a more flexible - but generic -
            solution, that frequently leads the user to a very unclear path,
            since the main direction is not set properly.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FAQ;
