import React from "react";
import App from "./layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import "./index.css";

const Landing = () => {
   return (
      <div>
         <Home />

         <h1>Welcome to the Landing Page</h1>
      </div>
   );
};

export default Landing;
