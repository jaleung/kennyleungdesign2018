import React from "react";
import ScrollableAnchor from "react-scrollable-anchor";
import "../css/mono.css";
import Scroller from "./scrollToPage";
// import TypeIt from 'typeit';
import Typist from 'react-typist';
import "../css/typist.css";
import uuid from "uuid/v4"


export const Home = props => {
  console.log('ID!!:', uuid())
  return <ScrollableAnchor id={"home"}>
      <div className="modular-row" style={{ justifyContent: "center" }}>
        <Typist className="card-content" avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
          <Typist.Delay ms={500} />
          <p key={uuid()}>
            <span className="c-green">#kenny</span>
            <span className="c-grey">·</span>&#123;
          </p>
          <br />
          <p key={uuid()}>
            <span className="c-grey">··</span>
            <span className="c-blue">
              position
            </span>:<span className="c-grey">·</span>
            <span className="c-orange">$ui-ux-designer</span>;
            <Typist.Backspace count={10} delay={200} />
            <span className="c-orange">-developer</span>;
          </p>
          <br />
          <p key={uuid()}>
            <span className="c-grey">··</span>
            <span className="c-blue">
              display
            </span>:<span className="c-grey">·</span>
            <span className="c-orange">$nerd</span>;
            <Typist.Backspace count={5} delay={200} />
            <span className="c-orange">geek</span>;
          </p>
          <br />
          <div className="extras">
            <p key={uuid()}>
              <span className="c-grey">··</span>
              <span className="c-blue">
                background
              </span>:<span className="c-grey">·</span>
              <span className="c-orange">
                $web-dev
              </span>,<span className="c-grey">·</span>
              <span className="c-orange">$design</span>
              <span className="c-grey">·</span>
              <span className="c-blue">no-repeat</span>;
            </p>
            <br />
            <p key={uuid()}>
              <span className="c-grey">··</span>
              <span className="c-blue">
                clear
              </span>:<span className="c-grey">·</span>
              <span className="c-blue">both</span>
              <span className="c-red italic">!important</span>;
            </p>
            <br />
            <p key={uuid()}>
              <span className="c-grey">··</span>
              <span className="c-red">
                &amp;
              </span>:<span className="c-green">before</span>
              <span className="c-grey">·</span>&#123;
            </p>
            <br />
            <p key={uuid()}>
              <span className="c-grey">····</span>
              <span className="c-blue">
                min-height
              </span>:<span className="c-grey">·</span>
              <span className="c-purple">165cm</span>
              <span className="c-grey">
                ·
              </span>+<span className="c-grey">·</span>
              <span className="c-orange">$x</span>;
            </p>
            <br />
            <p key={uuid()}>
              <span className="c-grey">····</span>
              <span className="c-blue">
                appearance
              </span>:<span className="c-grey">·</span>
              <span className="c-blue">normal</span>;
            </p>
            <br />
            <p key={uuid()}>
              <span className="c-grey">····</span>
              <span className="c-blue">
                transition-delay
              </span>:<span className="c-grey">·</span>
              <span className="c-purple">1980s</span>;
            </p>
            <br />
            <p key={uuid()}>
              <span className="c-grey">··</span>}
            </p>
            <br />
          </div>
          <p key={uuid()}>}</p>
        </Typist>
        <Scroller to="about" />
      </div>
    </ScrollableAnchor>;
};
