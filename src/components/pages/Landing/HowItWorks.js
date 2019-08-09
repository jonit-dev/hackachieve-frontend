import React from "react";

const HowItWorks = props => {
  return (
    <>
      <div className="site-section bg-light" id="about-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h1>How it works</h1>
              <h2 className="text-black mb-4">Step by step explanation</h2>
              <p className="mb-4">
                See how Hackachieve can easily leverage your team's performance
                when working towards a common goal
              </p>
              <p>
                <a
                  href="https://www.youtube.com/watch?v=DRLLESr1yeQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  WATCH TUTORIAL
                </a>
              </p>
            </div>
            <div className="col-lg-7">
              <a
                href="https://www.youtube.com/watch?v=DRLLESr1yeQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="landing_resources/images/about_1.jpg"
                  alt="more information video"
                  className="img-fluid mb-lg-0 rounded shadow"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HowItWorks;
