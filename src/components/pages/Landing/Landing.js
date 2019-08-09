import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import User from "../../../classes/User";
import Analytics from "../../../analytics/Analytics";
import { userFacebookLogin } from "../../../actions/authActions";
import FacebookLogin from "react-facebook-login";
import { Helmet } from "react-helmet";
import BenefitItem from "./BenefitItem";
import FeatureSection from "./FeatureSection";
import FeatureSectionReverse from "./FeatureSectionReverse";

class Landing extends Component {
  componentDidMount() {
    Analytics.track("landing_visit", {
      eventCategory: "pages",
      eventAction: "landing_visit"
    });
  }
  responseFacebook = response => {
    let facebookvalue = {
      provider: "facebook",
      access_token: response.accessToken
    };
    this.props.userFacebookLogin(facebookvalue).then(response => {
      //first register it
    });
  };

  render() {
    // console.log(User.isLoggedIn(),'User.isLoggedIn()');
    return (
      <React.Fragment>
        <Helmet>
          <title>
            Hackachive - Double your productivity with Goal Setting Software
          </title>
          <link rel="canonical" href="https://www.hackachieve.com/"></link>
          <meta
            name="description"
            content="Hackachieve is an online goal setting and management software that helps to manage all your goals and improves personal as well as business productivity."
          />
        </Helmet>
        <div className="site-wrap" id="home-section">
          <div className="site-blocks-cover">
            <video autoPlay muted loop className="landing-bkg-video">
              <source src="/videos/landing-bkg.mp4" type="video/mp4" />
            </video>

            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div
                  className="col-md-12"
                  style={{ position: "relative" }}
                  data-aos="fade-up"
                >
                  <div className="row">
                    <div className="col-lg-5 landing-main-text">
                      <h1>Organize Your Project Goals!</h1>
                      <p>
                        Stay on top of things by keeping track of your goals,
                        tasks and your team member tasks!
                      </p>
                      <div>
                        {User.isLoggedIn() ? (
                          <NavLink
                            to="/projects"
                            className="btn btn-primary mr-2 mb-2"
                          >
                            ACCESS YOUR PROJECTS
                          </NavLink>
                        ) : (
                          <div className="fb-login">
                            <div className="fb-login-btn">
                              <FacebookLogin
                                //put your app id below
                                appId="379010106063409"
                                autoLoad={false}
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}
                              />
                            </div>

                            <div className="fb-login-email-pw">
                              <NavLink to="/register" className="btn">
                                or create your free account with e-mail and
                                password
                              </NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="col-lg-7">
                      <img
                        src="landing_resources/images/landing_1.webp"
                        alt="character with goals"
                        className="img-fluid cracter-img"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="site-section bg-light" id="features-section">
            <div className="container">
              <div className="row mb-5">
                <div className="col-12 text-center">
                  <h2 className="section-title mb-3">Features</h2>
                </div>
              </div>
              <div className="row align-items-stretch">
                <BenefitItem
                  iconClasses="far fa-grin-stars"
                  title="Personal or Business use"
                  description="Hackachieve is a pretty flexible tool: It can be used for your own personal goals, small or big projects or even to manage your entire company."
                />

                <BenefitItem
                  iconClasses="far fa-calendar-check"
                  title="Never miss a deadline"
                  description=" We’ll promptly notify you if some of your goals is about
                        to expire, avoiding the headaches that a missing it
                        could cause."
                />

                <BenefitItem
                  iconClasses="fas fa-users"
                  title="Coordinate your team"
                  description="Assign them and track tasks, staying in touch with what everyone is doing! Leverage your project potential by making everyone work towards a common goal!"
                />

                <BenefitItem
                  iconClasses="fas fa-tachometer-alt"
                  title="Easy-to-use productivity tool"
                  description=" Hackachieve allows you to easily create short term and
                        long term goals, checklists, labels, set deadlines, and
                        etc. Everything you need to manage your own life or the
                        daily operations of your business!"
                />

                <BenefitItem
                  iconClasses="fas fa-cloud"
                  title="Replace paperwork"
                  description="Have all of your information in a single place that can be accessed from anywhere! It's way easier to coordinate with other team members and to focus in what's important."
                />
              </div>
            </div>
          </div>
          <div className="feature-big">
            <div className="container">
              <FeatureSection
                featureImg="landing_resources/images/dashboard.webp"
                title="All your goals in one place"
                description="Hackachieve helps you to “connect the dots” between your
                    long and short term goals, doubling your productivity in
                    half of the time! Stop losing time procastinating."
                benefitsArray={[
                  "- Engage and organize your team",
                  "- Set your own personal goals"
                ]}
                testimonialImg="landing_resources/images/person_1.webp"
                testimonialAuthor="Joao Paulo Furtado"
                testimonialRole="Full-stack developer."
                testimonialQuote="“I dont know what else to say. I would be lost without Hackachieve. Man, this thing is getting better and better as I learn more about it.”"
              />

              <FeatureSectionReverse
                featureImg="landing_resources/images/dashboard.webp"
                title="All your goals in one place"
                description="Hackachieve helps you to “connect the dots” between your
                    long and short term goals, doubling your productivity in
                    half of the time! Stop losing time procastinating."
                benefitsArray={[
                  "- Engage and organize your team",
                  "- Set your own personal goals"
                ]}
                testimonialImg="landing_resources/images/person_1.webp"
                testimonialAuthor="Joao Paulo Furtado"
                testimonialRole="Full-stack developer."
                testimonialQuote="“I dont know what else to say. I would be lost without Hackachieve. Man, this thing is getting better and better as I learn more about it.”"
              />
            </div>

            <div className="">
              <div className="col-md-12">
                <p className="mb-0 copyright">
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with{" "}
                  <i className="icon-heart" aria-hidden="true" /> by{" "}
                  <a href="https://colorlib.com" target="blank">
                    Colorlib
                  </a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="site-section bg-light" id="about-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <h1>How it works</h1>
                <h2 className="text-black mb-4">Step by step explanation</h2>
                <p className="mb-4">See how your team can structure the work to convert all of your goals into workable plans</p>
                <p><a href="# " className="btn btn-primary">GET STARTED</a></p>
              </div>
              <div className="col-lg-7">
                <img src="landing_resources/images/about_1.jpg" alt="more information video" className="img-fluid mb-lg-0 rounded shadow" />
              </div>
            </div>
          </div>
        </div> */}
          {/*div class="site-section testimonial-wrap" id="testimonials-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="section-title mb-3">Testimonials</h2>
          </div>
        </div>
      </div>
      <div class="slide-one-item home-slider owl-carousel">
          <div>
            <div class="testimonial">
              <figure class="mb-4 d-block align-items-center justify-content-center">
                <div><img src="/images/person_3.jpg" alt="Image" class="w-100 img-fluid mb-3 shadow"></div>
              </figure>
              <blockquote class="mb-3">
                <p>&ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reprehenderit aperiam quaerat fugiat repudiandae explicabo animi minima fuga beatae illum eligendi incidunt consequatur. Amet dolores excepturi earum unde iusto.&rdquo;</p>
              </blockquote>
              <p class="text-black"><strong>John Smith</strong></p>

              
            </div>
          </div>
          <div>
            <div class="testimonial">
              
              <figure class="mb-4 d-block align-items-center justify-content-center">
                <div><img src="/images/person_2.jpg" alt="Image" class="w-100 img-fluid mb-3 shadow"></div>
              </figure>

              <blockquote class="mb-3">
                <p>&ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reprehenderit aperiam quaerat fugiat repudiandae explicabo animi minima fuga beatae illum eligendi incidunt consequatur. Amet dolores excepturi earum unde iusto.&rdquo;</p>
              </blockquote>
              
              <p class="text-black"><strong>Robert Aguilar</strong></p>
              
              
            </div>
          </div>

          <div>
            <div class="testimonial">
              <figure class="mb-4 d-block align-items-center justify-content-center">
                <div><img src="/images/person_4.jpg" alt="Image" class="w-100 img-fluid mb-3 shadow"></div>
              </figure>
              <blockquote class="mb-3">
                <p>&ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reprehenderit aperiam quaerat fugiat repudiandae explicabo animi minima fuga beatae illum eligendi incidunt consequatur. Amet dolores excepturi earum unde iusto.&rdquo;</p>
              </blockquote>
              <p class="text-black"><strong>Roger Spears</strong></p>

              
            </div>
           
          </div>

          <div>
            <div class="testimonial">
              <figure class="mb-4 d-block align-items-center justify-content-center">
                <div><img src="/images/person_1.jpg" alt="Image" class="w-100 img-fluid mb-3 shadow"></div>
              </figure>
              <blockquote class="mb-3">
                <p>&ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur unde reprehenderit aperiam quaerat fugiat repudiandae explicabo animi minima fuga beatae illum eligendi incidunt consequatur. Amet dolores excepturi earum unde iusto.&rdquo;</p>
              </blockquote>
              <p class="text-black"><strong>Kyle McDonald</strong></p>

              
            </div>

          </div>

        </div>
    </div>

    <div class="site-section" id="blog-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="section-title mb-3">Blog Posts</h2>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4">
            <div class="h-entry">
              <img src="/images/img_1.jpg" alt="Image" class="img-fluid">
              <h2><a href="# ">Create interactive prototypes</a></h2>
              <div class="meta mb-4">Ham Brook <span class="mx-2">&bullet;</span> Jan 18, 2019<span class="mx-2">&bullet;</span> <a href="# ">News</a></div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.</p>
              <p><a href="# ">Continue Reading...</a></p>
            </div> 
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4">
            <div class="h-entry">
              <img src="/images/img_2.jpg" alt="Image" class="img-fluid">
              <h2><a href="# ">Create interactive prototypes</a></h2>
              <div class="meta mb-4">James Phelps <span class="mx-2">&bullet;</span> Jan 18, 2019<span class="mx-2">&bullet;</span> <a href="# ">News</a></div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.</p>
              <p><a href="# ">Continue Reading...</a></p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4">
            <div class="h-entry">
              <img src="/images/img_3.jpg" alt="Image" class="img-fluid">
              <h2><a href="# ">Create interactive prototypes</a></h2>
              <div class="meta mb-4">James Phelps <span class="mx-2">&bullet;</span> Jan 18, 2019<span class="mx-2">&bullet;</span> <a href="# ">News</a></div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.</p>
              <p><a href="# ">Continue Reading...</a></p>
            </div> 
          </div>
          
        </div>
      </div>
    </div>

    <div class="site-section bg-light" id="contact-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-12 text-center">
            <h2 class="section-title mb-3">Get In Touch</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-7 mb-5">

            

            <form action="#" class="p-5 bg-white">
              
              <h2 class="h4 text-black mb-5">Contact Form</h2> 

              <div class="row form-group">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label class="text-black" for="fname">First Name</label>
                  <input type="text" id="fname" class="form-control rounded-0">
                </div>
                <div class="col-md-6">
                  <label class="text-black" for="lname">Last Name</label>
                  <input type="text" id="lname" class="form-control rounded-0">
                </div>
              </div>

              <div class="row form-group">
                
                <div class="col-md-12">
                  <label class="text-black" for="email">Email</label> 
                  <input type="email" id="email" class="form-control rounded-0">
                </div>
              </div>

              <div class="row form-group">
                
                <div class="col-md-12">
                  <label class="text-black" for="subject">Subject</label> 
                  <input type="subject" id="subject" class="form-control rounded-0">
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12">
                  <label class="text-black" for="message">Message</label> 
                  <textarea name="message" id="message" cols="30" rows="7" class="form-control rounded-0" placeholder="Write your notes or questions here..."></textarea>
                </div>
              </div>

              <div class="row form-group">
                <div class="col-md-12">
                  <input type="submit" value="Send Message" class="btn btn-primary mr-2 mb-2">
                </div>
              </div>

  
            </form>
          </div>
        
        </div>
        
      </div>
    </div*/}
        </div>{" "}
        {/* .site-wrap */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {
    //actions here
    userFacebookLogin
  }
)(Landing);
