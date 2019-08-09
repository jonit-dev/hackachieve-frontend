import React from "react";
import { Link } from "react-router-dom";

const BenefitItem = props => {
  const { iconClasses, title, description } = props;

  return (
    <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
      <Link to="/register" className="benefit-link">
        <div className="unit-4 d-block">
          <div className="unit-4-icon mb-3">
            <span className="icon-wrap">
              <span>
                <i className={iconClasses}></i>
              </span>
            </span>
          </div>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
            {/* <p><a href="# ">Learn More</a></p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};
export default BenefitItem;
