import React from "react";
import "../assets/styles/About.css";
// import ImageArrow from "../assets/image/Component 18.png"

export default function AboutPage() {
  return (
    <div className="container">
      <div className="container_header">
        <div className="group_left_header">
          <div className="group_left">
            <button> About Us</button>
            <p>
              WE ARE TRUSTED ADVISORS <br />
              COMMITTED TO EXCELLENCE
            </p>
          </div>

          <div className="group_right">
            <div className="text">
              <p>
                Jay Capital Advisory Limited <br /> is a{" "}
                <span>SEC-approved </span> boutique <br /> financial advisory
                firm based <br />
                in Bangkok, Thailand.{" "}
              </p>

              <div>
                <img src="/arrow-right.png"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
