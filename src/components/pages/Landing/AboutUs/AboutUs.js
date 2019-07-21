import React from "react";
import Helmet from "react-helmet";

const AboutUs = props => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Hackachieve | FAQ</title>
        <meta
          name="description"
          content="Understand about how hackachieve can assist you in achieving your personal and business goals"
        />
      </Helmet>

      <div className="site-wrap internal-page">
        <div className="ui text container privacy">
          <h1>About Us</h1>

          <div className="ui divider"></div>

          <p>
            Hackachieve is a goal setting application that will help you track
            your goals based on small incremental wins along the way. We utilize
            scrum methodology by translating most of the principles such as
            reiteration and backlogs to achieve our goals. This will allow the
            user to take small steps towards achieving a long-term goal that
            they have defined for themselves. Doing so, the user will feel a
            sense of accomplishment and motivation to address large, more
            daunting goals which may cause people to give up before they see any
            results.
          </p>
          <p>
            Our application also allows the user to create a roadmap based on
            smaller goals in order to reach a large goal. For example, if a user
            wants to achieve a large goal of losing 20 pounds, they can make
            that their long-term goal. Then the user will be able to create
            smaller goals such as going to the gym, or eating a salad for lunch
            that is linked directly to it. Each time they accomplish a small
            goal, they will be rewarded with points that consequently will
            create a positive feedback loop that encourages the user to meet the
            smaller goals on a consistent basis. Hence, we provide value to our
            user by enabling a cross platform application that will help users
            ‘hack’ their way to achieving their goals.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AboutUs;
