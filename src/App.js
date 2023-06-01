
import React from "react";
import { Routes, Route } from "react-router-dom";


import HeaderNav from "./components/HeaderNav";
import Home from "./components/Home";
import AddScenario from "./components/AddScenario";
import AllScenarios from "./components/AllScenarios";
import AddVehicle from "./components/AddVehicle";

import "./styles/header.css"
import "./styles/Allscenarios.css"
import "./styles/Addscenario.css"
import "./styles/App.css";
import "./styles/Home.css";
import "./styles/Addvehicle.css";



function App() {
   return (
      <div className="app">
         <HeaderNav  />

         <div>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/add-scenario' element={<AddScenario />} />
               <Route path='/all-scenarios' element={<AllScenarios />} />
               <Route path='/add-vehicle' element={<AddVehicle />} />
            </Routes>
         </div>
      </div>
   );
}

export default App;
