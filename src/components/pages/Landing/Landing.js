import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import User from "../../../classes/User";
import Analytics from "../../../analytics/Analytics";
import { userFacebookLogin } from "../../../actions/authActions";
import FacebookLogin from "react-facebook-login";

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
        <div className="site-wrap" id="home-section">
          <div className="site-blocks-cover">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div
                  className="col-md-12"
                  style={{ position: "relative" }}
                  data-aos="fade-up"
                >
                  <div className="row">
                    <div className="col-lg-5">
                      <h1>Productivity Doesn’t Need To Be Boring!</h1>
                      <p>
                        In Hackachieve you can and double your results in half
                        of your time
                      </p>
                      <div>
                        {User.isLoggedIn() ? (
                          <NavLink
                            to="/board"
                            className="btn btn-primary mr-2 mb-2"
                          >
                            ACCESS YOUR GOALS
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
                                or create your account with e-mail and password
                              </NavLink>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <img
                        src="landing_resources/images/landing_1.webp"
                        alt="character with goals"
                        className="img-fluid cracter-img"
                      />
                    </div>
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
                <div
                  className="col-md-6 col-lg-4 mb-4 mb-lg-4"
                  data-aos="fade-up"
                >
                  <div className="unit-4 d-block">
                    <div className="unit-4-icon mb-3">
                      <span className="icon-wrap">
                        <span>
                        <i className="far fa-calendar-check"></i>
                        </span>
                      </span>
                    </div>
                    <div>
                      <h3>Never miss a deadline</h3>
                      <p>
                        We’ll promptly notify you if some of your goals is about
                        to expire, avoiding the headaches that a missing it
                        could cause.
                      </p>
                      {/* <p><a href="# ">Learn More</a></p> */}
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 mb-4 mb-lg-4"
                  data-aos="fade-up"
                >
                  <div className="unit-4 d-block">
                    <div className="unit-4-icon mb-3">
                      <span className="icon-wrap">
                           <span>
                           <i className="fas fa-user-tie"></i>
                           </span>
                      </span>
                    </div>
                    <div>
                      <h3>For Businesses</h3>
                      <p>
                        Manage your business in an engaging way: allow your
                        teammates to earn points if certain goals are achieved
                        and reward the best performing ones!
                      </p>
                      {/* <p><a href="# ">Learn More</a></p> */}
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 mb-4 mb-lg-4"
                  data-aos="fade-up"
                >
                  <div className="unit-4 d-block">
                    <div className="unit-4-icon mb-3">
                      <span className="icon-wrap">
                        <span>
                          <i className="fas fa-users" />
                        </span>
                      </span>
                    </div>
                    <div>
                      <h3>Community-oriented platform</h3>
                      <p>
                        We bring social to a productivity context! In our
                        platform, you can share your goals, see a goal feed and
                        even follow people that you admire
                      </p>
                      {/* <p><a href="# ">Learn More</a></p> */}
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 mb-4 mb-lg-4"
                  data-aos="fade-up"
                >
                  <div className="unit-4 d-block">
                    <div className="unit-4-icon mb-3">
                      <span className="icon-wrap">
                          <span>
                          <i className="fas fa-tachometer-alt"></i>
                          </span>
                      </span>
                    </div>
                    <div>
                      <h3>Productivity Tools</h3>
                      <p>
                        Hackachieve allows you to easily create short term and
                        long term goals, checklists, labels, set deadlines, and
                        etc. Everything you need to manage your own life or the
                        daily operations of your business!
                      </p>
                      {/* <a><a href="# ">Learn More</a></a> */}
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
                <div className="unit-4 d-block">
                  <div className="unit-4-icon mb-3">
                    <span className="icon-wrap"><span className="text-primary icon-sentiment_satisfied" /></span>
                  </div>
                  <div>
                    <h3>Gamification Features</h3>
                    <p>Engage yourself or your team with points and rewards, boosting their productivity and keeping a long term alignment with your goals.</p>
                    <p><a href="# ">Learn More</a></p>
                  </div>
                </div>
              </div> */}
                {/* <div className="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
                <div className="unit-4 d-block">
                  <div className="unit-4-icon mb-3">
                    <span className="icon-wrap"><span><i className="fas fa-comments" /></span></span>
                  </div>
                  <div>
                    <h3>Crowd Help</h3>
                    <p>Receive suggestions from other skilled users in your card goals, assisting you to overcome obstacles in an interactive way.</p>
                    <p><a href="# ">Learn More</a></p>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
          <div className="feature-big">
            <div className="container">
              <div className="row site-section" id="connect-the-dots">
                <div className="col-lg-7">
                  <img
                    src="landing_resources/images/dashboard.webp"
                    alt="dashboard illustration"
                    className="img-fluid"
                  />
                </div>
                <div className="col-lg-5 ml-auto">
                  <h2 className="text-black">Connect the dots</h2>
                  <p className="mb-4">
                    Hackachieve helps you to “connect the dots” between your
                    long and short term goals, doubling your productivity in
                    half of the time! Stop losing time procastinating.
                  </p>
                  <ul className="ul-check mb-5 list-unstyled success">
                    <li>- Engage and organize your team</li>
                    <li>- Set your own personal goals</li>
                  </ul>
                  <div className="author-box">
                    <div className="d-flex mb-4">
                      <div className="mr-3">
                        <img
                          src="landing_resources/images/person_1.webp"
                          alt="testimonial person"
                          className="img-fluid rounded-circle"
                        />
                      </div>
                      <div className="mr-auto text-black">
                        <strong className="font-weight-bold mb-0">
                          Joao Paulo Furtado
                        </strong>{" "}
                        <br />
                        Full-stack developer.
                      </div>
                    </div>
                    <blockquote>
                      “I dont know what else to say. I would be lost without
                      Hackachieve. Man, this thing is getting better and better
                      as I learn more about it.”
                    </blockquote>
                  </div>
                </div>
              </div>
              {/*div class="mt-5 row mb-5 site-section ">
          <div class="col-lg-7 order-1 order-lg-2">
            <img src="images/do_ui_kit_hero_floating_devices-2x.png" alt="Image" class="img-fluid">
          </div>
          <div class="col-lg-5 pr-lg-5 mr-auto mt-5 order-2 order-lg-1">
            <h2 class="text-black">Create interactive prototypes</h2>
            <p class="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem neque nisi architecto autem molestias corrupti officia veniam</p>
            <ul class="ul-check mb-5 list-unstyled success">
              <li>Laborum enim quasi at modi</li>
              <li>Ad at tempore</li>
            </ul>
            

            <div class="author-box">
              <div class="d-flex mb-4">
                <div class="mr-3">
                  <img src="images/person_4.jpg" alt="Image" class="img-fluid rounded-circle">
                </div>
                <div class="mr-auto text-black">
                  <strong class="font-weight-bold mb-0">Darren K.</strong> <br>
                  Co-Founder, XYZ Inc.
                </div>
              </div>
              <blockquote>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus vitae ipsa asperiores inventore aperiam iure?&rdquo;</blockquote>
            </div>
          </div>
        </div*/}
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
                <div><img src="images/person_3.jpg" alt="Image" class="w-100 img-fluid mb-3 shadow"></div>
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
                <div><img src="images/person_2.jpg" alt="Image" class="w-100 img-fluid mb-3 shadow"></div>
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
                <div><img src="images/person_4.jpg" alt="Image" class="w-100 img-fluid mb-3 shadow"></div>
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
                <div><img src="images/person_1.jpg" alt="Image" class="w-100 img-fluid mb-3 shadow"></div>
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
              <img src="images/img_1.jpg" alt="Image" class="img-fluid">
              <h2><a href="# ">Create interactive prototypes</a></h2>
              <div class="meta mb-4">Ham Brook <span class="mx-2">&bullet;</span> Jan 18, 2019<span class="mx-2">&bullet;</span> <a href="# ">News</a></div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.</p>
              <p><a href="# ">Continue Reading...</a></p>
            </div> 
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4">
            <div class="h-entry">
              <img src="images/img_2.jpg" alt="Image" class="img-fluid">
              <h2><a href="# ">Create interactive prototypes</a></h2>
              <div class="meta mb-4">James Phelps <span class="mx-2">&bullet;</span> Jan 18, 2019<span class="mx-2">&bullet;</span> <a href="# ">News</a></div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eligendi nobis ea maiores sapiente veritatis reprehenderit suscipit quaerat rerum voluptatibus a eius.</p>
              <p><a href="# ">Continue Reading...</a></p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4">
            <div class="h-entry">
              <img src="images/img_3.jpg" alt="Image" class="img-fluid">
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
