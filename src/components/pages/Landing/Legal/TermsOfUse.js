import React, { Component } from "react";
import env from "../../../../env";
import Analytics from "../../../../analytics/Analytics";
import { Helmet } from "react-helmet";

class TermsOfUse extends Component {
  state = { env: env };

  componentDidMount() {
    Analytics.track("terms_of_use_visit", {
      eventCategory: "pages",
      eventAction: "terms_of_use_visit"
    });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Hackachieve | Terms and Conditions</title>
          <meta
            name="description"
            content="These terms and conditions outline the rules and regulations
for the use of Hackachieve's platform. We assume you accept these terms and conditions in full."
          />
        </Helmet>

        <div className="site-wrap internal-page">
          <div className="ui text container terms">
            <h1>Terms of Use</h1>

            <div className="ui divider"></div>

            <p>
              These terms and conditions outline the rules and regulations for
              the use of Hackachieve's platform.
            </p>

            <p>
              <strong>
                By accessing this platform we assume you accept these terms and
                conditions in full. Do not continue to use Hackachieve's
                platform if you do not accept all of the terms and conditions
                stated on this page.
              </strong>
            </p>

            <p>
              These User Terms are a legally binding contract between you and
              us. As part of these User Terms, you agree to comply with the most
              recent version of our <a href="privacy">Privacy Policy</a>, which
              is incorporated by reference into these User Terms. If you access
              or use the Services, or continue accessing or using the Services
              after being notified of a change to the User Terms or the
              Acceptable Use Policy, you confirm that you have read, understand
              and agree to be bound by the User Terms and the privacy policy.
            </p>

            <p>
              The following terminology applies to these Terms and Conditions,
              Privacy Statement and Disclaimer Notice and any or all Agreements:
              “Client”, “You” and “Your” refers to you, the person accessing
              this platform and accepting the Company’s terms and conditions.
              “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our
              Company. “Party”, “Parties”, or “Us”, refers to both the Client
              and ourselves, or either the Client or ourselves. All terms refer
              to the offer, acceptance and consideration of payment necessary to
              undertake the process of our assistance to the Client in the most
              appropriate manner, whether by formal meetings of a fixed
              duration, or any other means, for the express purpose of meeting
              the Client’s needs in respect of provision of the Company’s stated
              services/products, in accordance with and subject to, prevailing
              law of Canada. Any use of the above terminology or other words in
              the singular, plural, capitalisation and/or he/she or they, are
              taken as interchangeable and therefore as referring to same.
            </p>

            <h2>Legal Age</h2>

            <h3>You Must be Over the Legal Age to use our platform</h3>
            <p>
              To the extent prohibited by applicable law, the Services are not
              intended for and should not be used by anyone under the legal age
              of your current province. You represent that you are over the
              legal age and are the intended recipient of Customer’s invitation
              to the Services. You may not access or use the Services for any
              purpose if either of the representations in the preceding sentence
              is not true. Without limiting the foregoing, you must be of legal
              working age.
            </p>

            <h2>Limitation of Liability</h2>

            <p>
              If we believe that there is a violation of the Contract, User
              Terms, the Acceptable Use Policy, or any of our other policies
              that can simply be remedied by Customer’s removal of certain
              Customer Data or taking other action, we will, in most cases, ask
              Customer to take action rather than intervene. We may directly
              step in and take what we determine to be appropriate action
              (including disabling your account) if Customer does not take
              appropriate action or we believe there is a credible risk of harm
              to us, the Services, Authorized Users, or any third parties.{" "}
            </p>

            <p>
              IN NO EVENT WILL YOU OR WE HAVE ANY LIABILITY TO THE OTHER FOR ANY
              LOST PROFITS OR REVENUES OR FOR ANY INDIRECT, SPECIAL, INCIDENTAL,
              CONSEQUENTIAL, COVER OR PUNITIVE DAMAGES HOWEVER CAUSED, WHETHER
              IN CONTRACT, TORT OR UNDER ANY OTHER THEORY OF LIABILITY, AND
              WHETHER OR NOT THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
              SUCH DAMAGES. UNLESS YOU ARE ALSO A CUSTOMER (AND WITHOUT
              LIMITATION TO OUR RIGHTS AND REMEDIES UNDER THE CONTRACT), YOU
              WILL HAVE NO FINANCIAL LIABILITY TO US FOR A BREACH OF THESE USER
              TERMS. OUR MAXIMUM AGGREGATE LIABILITY TO YOU FOR ANY BREACH OF
              THE USER TERMS IS ONE HUNDRED DOLLARS ($100) IN THE AGGREGATE. THE
              FOREGOING DISCLAIMERS WILL NOT APPLY TO THE EXTENT PROHIBITED BY
              APPLICABLE LAW AND DO NOT LIMIT EITHER PARTY’S RIGHT TO SEEK AND
              OBTAIN EQUITABLE RELIEF.
            </p>

            <h2>Third Party Applications</h2>

            <p>
              The Hackachieve service is integrated with third party
              applications, websites, and services (“Third Party Applications”)
              to make available content, products, and/or services to you. These
              Third Party Applications may have their own terms and conditions
              of use and privacy policies and your use of these Third Party
              Applications will be governed by and subject to such terms and
              conditions and privacy policies. You understand and agree that
              Hackachieve does not endorse and is not responsible or liable for
              the behavior, features, or content of any Third Party Application
              or for any transaction you may enter into with the provider of any
              such Third Party Applications.
            </p>

            <h2>User Generated Content</h2>

            <p>
              Hackachieve users may post, upload, and/or contribute (“post”)
              content to the Service (which may include, for example, pictures,
              text, messages, information and/or other types of content) (“User
              Content”). For the avoidance of doubt, “User Content” includes any
              such content posted to the Hackachieve Support Community as well
              as any other part of the Hackachieve Service. You promise that,
              with respect to any User Content you post on Hackachieve, (1) you
              have the right to post such User Content, and (2) such User
              Content, or its use by Hackachieve as contemplated by the
              Agreements, does not violate the Agreements, applicable law, or
              the intellectual property (including without limitation
              copyright), publicity, personality, or other rights of others or
              imply any affiliation with or endorsement of you or your User
              Content by Hackachieve. Hackachieve may, but has no obligation to,
              monitor, review, or edit User Content. In all cases, Hackachieve
              reserves the right to remove or disable access to any User Content
              for any or no reason, including but not limited to, User Content
              that, in Hackachieve’s sole discretion, violates the Agreements.
              Hackachieve may take these actions without prior notification to
              you or any third party. Removal or disabling of access to User
              Content shall be at our sole discretion, and we do not promise to
              remove or disable access to any specific User Content. You are
              solely responsible for all User Content that you post. Hackachieve
              is not responsible for User Content nor does it endorse any
              opinion contained in any User Content. YOU AGREE THAT IF ANYONE
              BRINGS A CLAIM AGAINST HACKACHIEVE RELATED TO USER CONTENT THAT
              YOU POST, THEN, TO THE EXTENT PERMISSIBLE UNDER LOCAL LAW, YOU
              WILL INDEMNIFY AND HOLD HACKACHIEVE HARMLESS FROM AND AGAINST ALL
              DAMAGES, LOSSES, AND EXPENSES OF ANY KIND (INCLUDING REASONABLE
              ATTORNEY FEES AND COSTS) ARISING OUT OF SUCH CLAIM.
            </p>

            <h2>Rights you grant to us</h2>

            <p>
              In consideration for the rights granted to you under the
              Agreements, you grant us the right (1) to allow the Hackachieve
              Service to use the processor, bandwidth, and storage hardware on
              your Device in order to facilitate the operation of the Service,
              (2) to provide advertising and other information to you, and (3)
              to allow our business partners to do the same. In any part of the
              Hackachieve Service, the Content you view, including its selection
              and placement, may be influenced by commercial considerations,
              including agreements with third parties. Some Content licensed or
              provided to Hackachieve may contain advertising as part of the
              Content. In such cases, Hackachieve will make such Content
              available to you unmodified. If you provide feedback, ideas or
              suggestions to Hackachieve in connection with the Hackachieve
              Service or Content (“Feedback”), you acknowledge that the Feedback
              is not confidential and you authorize Hackachieve to use that
              Feedback without restriction and without payment to you. Feedback
              is considered a type of User Content. You grant Hackachieve a
              non-exclusive, transferable, sub-licensable, royalty-free,
              perpetual (or, in jurisdictions where this is not permitted, for a
              term equal to the duration of the Agreements plus twenty (20)
              years), irrevocable, fully paid, worldwide licence to use,
              reproduce, make available to the public (e.g. perform or display),
              publish, translate, modify, create derivative works from, and
              distribute any of your User Content in connection with the Service
              through any medium, whether alone or in combination with other
              content or materials, in any manner and by any means, method or
              technology, whether now known or hereafter created. Aside from the
              rights specifically granted herein, you retain ownership of all
              rights, including intellectual property rights, in the User
              Content. Where applicable and permitted under applicable law, you
              also agree to waive any “moral rights” (or the equivalent under
              applicable law) such as your right to be identified as the author
              of any User Content, including Feedback, and your right to object
              to derogatory treatment of such User Content.
            </p>

            <h2>User guidelines</h2>

            <p>
              Hackachieve respects intellectual property rights and expects you
              to do the same. We’ve established a few ground rules for you to
              follow when using the Service, to make sure Hackachieve stays
              enjoyable for everyone. Please follow these rules and encourage
              other users to do the same.
            </p>

            <p>The following is not permitted for any reason whatsoever:</p>

            <ul>
              <li>
                copying, redistributing, reproducing, “ripping”, recording,
                transferring, performing or displaying to the public,
                broadcasting, or making available to the public any part of the
                Hackachieve Service or the Content, or otherwise making any use
                of the Hackachieve Service or the Content which is not expressly
                permitted under the Agreements or applicable law or which
                otherwise infringes the intellectual property rights (such as
                copyright) in the Hackachieve Service or the Content or any part
                of it;
              </li>
              <li>
                using the Hackachieve Service to import or copy any local files
                you do not have the legal right to import or copy in this way;
              </li>
              <li>
                transferring copies of cached Content from an authorized Device
                to any other Device via any means;
              </li>
              <li>
                reverse-engineering, decompiling, disassembling, modifying, or
                creating derivative works based on the Hackachieve Service,
                Content or any part thereof unless permitted by applicable law;
              </li>
              <li>
                circumventing any technology used by Hackachieve, its licensors,
                or any third party to protect the Content or the Service;
              </li>
              <li>
                selling, renting, sublicensing or leasing of any part of the
                Hackachieve Service or the Content;
              </li>
              <li>
                circumventing any territorial restrictions applied by
                Hackachieve or it licensors;
              </li>
              <li>
                artificially increasing visit count or otherwise manipulating
                the Services by using a script or other automated process;
              </li>
              <li>
                removing or altering any copyright, trademark, or other
                intellectual property notices contained on or provided through
                the Hackachieve Service (including for the purpose of disguising
                or changing any indications of the ownership or source of any
                Content);
              </li>
              <li>
                providing your password to any other person or using any other
                person’s username and password;
              </li>
              <li>
                “crawling” the Hackachieve Service or otherwise using any
                automated means (including bots, scrapers, and spiders) to
                collect information from Hackachieve; or
              </li>
              <li>
                selling a user account, or otherwise accepting any compensation,
                financial or otherwise, to influence the name of an account the
                content included on an account.
              </li>
            </ul>

            <p>
              Please respect Hackachieve, the owners of the Content, and other
              users of the Hackachieve Service. Don’t engage in any activity,
              post any User Content, or register and/or use a username, which is
              or includes material that:
            </p>

            <ul>
              <li>
                is offensive, abusive, defamatory, pornographic, threatening, or
                obscene;
              </li>
              <li>
                is illegal, or intended to promote or commit an illegal act of
                any kind, including but not limited to violations of
                intellectual property rights, privacy rights, or proprietary
                rights of Hackachieve or a third party;
              </li>
              <li>
                includes your password or purposely includes any other user’s
                password or purposely includes personal data of third parties or
                is intended to solicit such personal data;
              </li>
              <li>
                includes malicious content such as malware, Trojan horses, or
                viruses, or otherwise interferes with any user’s access to the
                Service;
              </li>
              <li>is intended to or does harass or bully other users;</li>
              <li>
                impersonates or misrepresents your affiliation with another
                user, person, or entity, or is otherwise fraudulent, false,
                deceptive, or misleading;
              </li>
              <li>uses automated means to artificially promote content;</li>
              <li>
                involves the transmission of unsolicited mass mailings or other
                forms of spam (“spam”), junk mail, chain letters, or similar,
                including through the Hackachieve inbox;
              </li>
              <li>
                involves commercial or sales activities, such as advertising,
                promotions, contests, sweepstakes, or pyramid schemes, that are
                not expressly authorized by Hackachieve;
              </li>
              <li>
                links to, references, or otherwise promotes commercial products
                or services, except as expressly authorized by Hackachieve;
              </li>
              <li>
                interferes with or in any way disrupts the Hackachieve Service,
                tampers with, breaches, or attempts to probe, scan, or test for
                vulnerabilities in the Service or Hackachieve’s computer
                systems, network, usage rules, or any of Hackachieve’s security
                components, authentication measures or any other protection
                measures applicable to the Service, the Content or any part
                thereof; or
              </li>
              <li>
                conflicts with the Agreements, as determined by Hackachieve.
              </li>
            </ul>

            <p>
              You acknowledge and agree that posting any such User Content may
              result in immediate termination or suspension of your Hackachieve
              account. You also agree that Hackachieve may also reclaim your
              username for any reason.
            </p>

            <p>
              Please be thoughtful about how you use the Hackachieve Service and
              what you share. The Hackachieve Service includes social and
              interactive features, including the ability to post User Content,
              share content, and make certain information about you public.
              Remember that shared or publicly available information may be used
              and re-shared by other users on Hackachieve or across the web, so
              please use Hackachieve carefully and be mindful of your account
              settings. Hackachieve has no responsibility for your choices to
              post material on the Service.
            </p>

            <p>
              Your password protects your user account, and you are solely
              responsible for keeping your password confidential and secure. You
              understand that you are responsible for all use of your username
              and password on the Service. If your username or password is lost
              or stolen, or if you believe there has been unauthorized access to
              your account by third parties, please notify us immediately and
              change your password as soon as possible.
            </p>

            <h2>Infringement and reporting User Content</h2>

            <p>
              Hackachieve respects the rights of intellectual property owners.
              If you believe that any Content infringes your intellectual
              property rights or other rights, send an e-mail to
              <a href={`mailto:${env.adminEmail}`}>{env.adminEmail}</a> and the
              content will be removed immediately. If Hackachieve is notified by
              a copyright holder that any Content infringes a copyright,
              Hackachieve may in its absolute discretion take actions without
              prior notification to the provider of that Content. If the
              provider believes that the content is not infringing, the provider
              may submit a counter-notification to Hackachieve with a request to
              restore the removed content.
            </p>

            <h2>Service limitations and modifications</h2>

            <p>
              Hackachieve will make reasonable efforts to keep the Hackachieve
              Service operational. However, certain technical difficulties or
              maintenance may, from time to time, result in temporary
              interruptions. To the extent permissible under applicable law,
              Hackachieve reserves the right, periodically and at any time, to
              modify or discontinue, temporarily or permanently, functions and
              features of the Hackachieve Service, with or without notice, all
              without liability to you, except where prohibited by law, for any
              interruption, modification, or discontinuation of the Hackachieve
              Service or any function or feature thereof.
            </p>

            <h2>Cookies</h2>
            <p>
              We employ the use of cookies. By using Hackachieve's platform you
              consent to the use of cookies in accordance with Hackachieve’s
              privacy policy.
            </p>
            <p>
              Most of the modern day interactive web sites use cookies to enable
              us to retrieve user details for each visit. Cookies are used in
              some areas of our site to enable the functionality of this area
              and ease of use for those people visiting. Some of our affiliate /
              advertising partners may also use cookies.
            </p>
            <h2>License</h2>
            <p>
              Unless otherwise stated, Hackachieve and/or it’s licensors own the
              intellectual property rights for all material on Hackachieve. All
              intellectual property rights are reserved. You may view and/or
              print pages from {env.productionUrl} for your own personal use
              subject to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ol>
              <li>Republish material from {env.productionUrl}</li>
              <li>
                Sell, rent or sub-license material from
                {this.state.env.productionUrl}
              </li>
              <li>
                Reproduce, duplicate or copy material from
                {this.state.env.productionUrl}
              </li>
              <li>
                Redistribute content from Hackachieve (unless content is
                specifically made for redistribution).
              </li>
            </ol>

            <h2>User Comments</h2>
            <ol>
              <li>
                Certain parts of this platform offer the opportunity for users
                to post and exchange opinions, information, material and data
                ('Comments') in areas of the platform. Hackachieve does not
                screen, edit, publish or review Comments prior to their
                appearance on the platform and Comments do not reflect the views
                or opinions of Hackachieve, its agents or affiliates. Comments
                reflect the view and opinion of the person who posts such view
                or opinion. To the extent permitted by applicable laws
                Hackachieve shall not be responsible or liable for the Comments
                or for any loss cost, liability, damages or expenses caused and
                or suffered as a result of any use of and/or posting of and/or
                appearance of the Comments on this platform.
              </li>
              <li>
                Hackachieve reserves the right to monitor all Comments and to
                remove any Comments which it considers in its absolute
                discretion to be inappropriate, offensive or otherwise in breach
                of these Terms and Conditions.
              </li>
              <li>
                You warrant and represent that:
                <ol>
                  <li>
                    You are entitled to post the Comments on our platform and
                    have all necessary licenses and consents to do so;
                  </li>
                  <li>
                    The Comments do not infringe any intellectual property
                    right, including without limitation copyright, patent or
                    trademark, or other proprietary right of any third party;
                  </li>
                  <li>
                    The Comments do not contain any defamatory, libelous,
                    offensive, indecent or otherwise unlawful material or
                    material which is an invasion of privacy
                  </li>
                  <li>
                    The Comments will not be used to solicit or promote business
                    or custom or present commercial activities or unlawful
                    activity.
                  </li>
                </ol>
              </li>
              <li>
                You hereby grant to <strong>Hackachieve</strong> a non-exclusive
                royalty-free license to use, reproduce, edit and authorize
                others to use, reproduce and edit any of your Comments in any
                and all forms, formats or media.
              </li>
            </ol>
            <h2>Hyperlinking to our Content</h2>
            <ol>
              <li>
                The following organizations may link to our Web site without
                prior written approval:
                <ol>
                  <li>Government agencies;</li>
                  <li>Search engines;</li>
                  <li>News organizations;</li>
                  <li>
                    Online directory distributors when they list us in the
                    directory may link to our Web site in the same manner as
                    they hyperlink to the Web sites of other listed businesses;
                    and
                  </li>
                  <li>
                    Systemwide Accredited Businesses except soliciting
                    non-profit organizations, charity shopping malls, and
                    charity fundraising groups which may not hyperlink to our
                    Web site.
                  </li>
                </ol>
              </li>
            </ol>
            <ol>
              <li>
                These organizations may link to our home page, to publications
                or to other Web site information so long as the link: (a) is not
                in any way misleading; (b) does not falsely imply sponsorship,
                endorsement or approval of the linking party and its products or
                services; and (c) fits within the context of the linking party's
                site.
              </li>
              <li>
                We may consider and approve in our sole discretion other link
                requests from the following types of organizations:
                <ol>
                  <li>
                    commonly-known consumer and/or business information sources
                    such as Chambers of Commerce, American Automobile
                    Association, AARP and Consumers Union;
                  </li>
                  <li>dot.com community sites;</li>
                  <li>
                    associations or other groups representing charities,
                    including charity giving sites,
                  </li>
                  <li>online directory distributors;</li>
                  <li>internet portals;</li>
                  <li>
                    accounting, law and consulting firms whose primary clients
                    are businesses; and
                  </li>
                  <li>educational institutions and trade associations.</li>
                </ol>
              </li>
            </ol>
            <p>
              We will approve link requests from these organizations if we
              determine that: (a) the link would not reflect unfavorably on us
              or our accredited businesses (for example, trade associations or
              other organizations representing inherently suspect types of
              business, such as work-at-home opportunities, shall not be allowed
              to link); (b)the organization does not have an unsatisfactory
              record with us; (c) the benefit to us from the visibility
              associated with the hyperlink outweighs the absence of
              Hackachieve; and (d) where the link is in the context of general
              resource information or is otherwise consistent with editorial
              content in a newsletter or similar product furthering the mission
              of the organization.
            </p>

            <p>
              These organizations may link to our home page, to publications or
              to other Web site information so long as the link: (a) is not in
              any way misleading; (b) does not falsely imply sponsorship,
              endorsement or approval of the linking party and it products or
              services; and (c) fits within the context of the linking party's
              site.
            </p>

            <p>
              If you are among the organizations listed in paragraph 2 above and
              are interested in linking to our platform, you must notify us by
              sending an e-mail to{" "}
              <a href={`mailto:${this.state.env.adminEmail}`}>
                {this.state.env.adminEmail}
              </a>
              . Please include your name, your organization name, contact
              information (such as a phone number and/or e-mail address) as well
              as the URL of your site, a list of any URLs from which you intend
              to link to our Web site, and a list of the URL(s) on our site to
              which you would like to link. Allow 2-3 weeks for a response.
            </p>

            <p>
              Approved organizations may hyperlink to our Web site as follows:
            </p>

            <ol>
              <li>By use of our corporate name; or</li>
              <li>
                By use of the uniform resource locator (Web address) being
                linked to; or
              </li>
              <li>
                By use of any other description of our Web site or material
                being linked to that makes sense within the context and format
                of content on the linking party's site.
              </li>
            </ol>
            <p>
              No use of Hackachieve’s logo or other artwork will be allowed for
              linking absent a trademark license agreement.
            </p>
            <h2>Iframes</h2>
            <p>
              Without prior approval and express written permission, you may not
              create frames around our Web pages or use other techniques that
              alter in any way the visual presentation or appearance of our Web
              site.
            </p>
            <h2>Reservation of Rights</h2>
            <p>
              We reserve the right at any time and in its sole discretion to
              request that you remove all links or any particular link to our
              Web site. You agree to immediately remove all links to our Web
              site upon such request. We also reserve the right to amend these
              terms and conditions and its linking policy at any time. By
              continuing to link to our Web site, you agree to be bound to and
              abide by these linking terms and conditions.
            </p>
            <h2>Removal of links from our platform</h2>
            <p>
              If you find any link on our Web site or any linked web site
              objectionable for any reason, you may contact us about this. We
              will consider requests to remove links but will have no obligation
              to do so or to respond directly to you.
            </p>
            <p>
              Whilst we endeavour to ensure that the information on this
              platform is correct, we do not warrant its completeness or
              accuracy; nor do we commit to ensuring that the platform remains
              available or that the material on the platform is kept up to date.
            </p>
            <h2>Content Liability</h2>
            <p>
              We shall have no responsibility or liability for any content
              appearing on your Web site. You agree to indemnify and defend us
              against all claims arising out of or based upon your platform. No
              link(s) may appear on any page on your Web site or within any
              context containing content or materials that may be interpreted as
              libelous, obscene or criminal, or which infringes, otherwise
              violates, or advocates the infringement or other violation of, any
              third party rights.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TermsOfUse;
