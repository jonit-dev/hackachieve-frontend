import React from "react";

const FeatureSectionReverse = props => {
  const {
    featureImg,
    title,
    description,
    benefitsArray,
    testimonialImg,
    testimonialAuthor,
    testimonialRole,
    testimonialQuote
  } = props;

  return (
    <>
      <div className="mt-5 row mb-5 site-section ">
        <div className="col-lg-7 order-1 order-lg-2">
          <img
            src={featureImg}
            alt="feature representation"
            className="img-fluid feature-img"
          />
        </div>
        <div className="col-lg-5 pr-lg-5 mr-auto mt-5 order-2 order-lg-1">
          <h2 className="text-black">{title}</h2>
          <p className="mb-4">{description}</p>
          <ul className="ul-check mb-5 list-unstyled success">
            {benefitsArray.map(benefit => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <div className="author-box">
            <div className="d-flex mb-4">
              <div className="mr-3">
                <img
                  src={testimonialImg}
                  alt="testimonial owner"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="mr-auto text-black">
                <strong className="font-weight-bold mb-0">
                  {testimonialAuthor}
                </strong>{" "}
                <br />
                {testimonialRole}
              </div>
            </div>
            <blockquote>{testimonialQuote}</blockquote>
          </div>
        </div>
      </div>
    </>
  );
};
export default FeatureSectionReverse;
