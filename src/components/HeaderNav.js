import React from "react";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <>


      <div className="sidebar">
        <h2><Link to="/">Apex Tech</Link></h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-scenario">Add Scenario </Link>
          </li>
          <li>
            <Link to="/all-scenarios"> All Scenarios</Link>
          </li>
          <li>
            <Link to="/add-vehicle">Add Vehicle</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderNav;
