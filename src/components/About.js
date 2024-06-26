import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import food from "../assets/burger-image.png";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-left">
        <h1>
          Welcome to <br /> The world of <br />
          <span>Tasty & Fresh Food</span>
        </h1>
        <h4>
          "Better you will feel if you eat a Food<span>Circles</span> healthy
          meal"
        </h4>
      </div>
      <div className="about-right">
        <img src={food} alt="Food Image" />
      </div>
    </div>
  );
};

export default About;
