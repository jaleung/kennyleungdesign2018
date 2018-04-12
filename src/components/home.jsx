import React from "react";
import ScrollableAnchor from "react-scrollable-anchor";
import "../css/mono.css";
import Scroller from "./scrollToPage";
// import TypeIt from 'typeit';
import Typist from 'react-typist';
import "../css/typist.css";


export const Home = props => {
  return <ScrollableAnchor id={"home"}>
      <div className="modular-row" style={{ justifyContent: "center" }}>
        <Typist className="card-content" avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
          <Typist.Delay ms={500} />
          <p>
            <span className="c-green">#kenny</span><span className="c-grey">·</span><span>&#123;</span>
          </p>
          <br />
          <p>
            <span className="c-grey">··</span>
            <span className="c-blue">
              position
            </span><span>:</span><span className="c-grey">·</span>
            <span className="c-orange">$ui-ux-designer</span><span>;</span>
            <Typist.Backspace count={10} delay={200} />
            <span className="c-orange">-developer</span><span>;</span>
          </p>
          <br />
          <p>
            <span className="c-grey">··</span>
            <span className="c-blue">
              display
            </span><span>:</span><span className="c-grey">·</span>
            <span className="c-orange">$nerd</span><span>;</span>
            <Typist.Backspace count={5} delay={200} />
            <span className="c-orange">geek</span><span>;</span>
          </p>
          <br />
          <div className="extras">
            <p>
              <span className="c-grey">··</span>
              <span className="c-blue">
                background
              </span><span>:</span><span className="c-grey">·</span>
              <span className="c-orange">$web-dev</span><span>,</span><span className="c-grey">·</span>
              <span className="c-orange">$design</span>
              <span className="c-grey">·</span>
              <span className="c-blue">no-repeat</span><span>;</span>
            </p>
            <br />
            <p>
              <span className="c-grey">··</span>
              <span className="c-blue">clear</span><span>:</span><span className="c-grey">·</span>
              <span className="c-blue">both</span>
              <span className="c-red italic">!important</span><span>;</span>
            </p>
            <br />
            <p>
              <span className="c-grey">··</span>
              <span className="c-red">
                &amp;
              </span><span>:</span><span className="c-green">before</span>
              <span className="c-grey">·</span><span>&#123;</span>
            </p>
            <br />
            <p>
              <span className="c-grey">····</span>
              <span className="c-blue">
                min-height
              </span><span>:</span><span className="c-grey">·</span>
              <span className="c-purple">165cm</span>
              <span className="c-grey">
                ·
              </span><span>+</span><span className="c-grey">·</span>
              <span className="c-orange">$x</span><span>;</span>
            </p>
            <br />
            <p>
              <span className="c-grey">····</span>
              <span className="c-blue">
                appearance
              </span><span>:</span><span className="c-grey">·</span>
              <span className="c-blue">normal</span><span>;</span>
            </p>
            <br />
            <p>
              <span className="c-grey">····</span>
              <span className="c-blue">
                transition-delay
              </span><span>:</span><span className="c-grey">·</span>
              <span className="c-purple">1980s</span><span>;</span>
            </p>
            <br />
            <p>
              <span className="c-grey">··</span><span>}</span> 
            </p>
            <br />
          </div>
          <p>}</p>
        </Typist>
        <Scroller to="about" />
      </div>
    </ScrollableAnchor>;
};
