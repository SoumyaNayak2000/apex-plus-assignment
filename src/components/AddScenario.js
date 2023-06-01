import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddScenarios = () => {
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioTime, setScenarioTime] = useState("");

  const handleReset = () => {
    setScenarioName("");
    setScenarioTime(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", scenarioName);

    formData.set("time", scenarioTime);

    // fetch("http://localhost:3000/vehicles", {
    const url = "http://localhost:3001/scenarios";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(formData),
      // body: formData

      body: JSON.stringify({ id: "", name: scenarioName, time: scenarioTime }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        toast.success(`Scenario added Successfully as id : ${data.id}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <ToastContainer />

      <div className="main-addscene">
        <h2>Add Secenerio</h2>

        <form method="post" id="form" onSubmit={handleSubmit}>
          <div className="container2">
            <div>
              <label htmlFor="scenarion">Scenario Name</label> <br />
              <input
                type="text"
                id="scenarion"
                required
                placeholder="Test Scenario"
                onChange={(e) => setScenarioName(e.target.value)}
                value={scenarioName}
              />
            </div>

            <div>
              <label htmlFor="scenariot">Scenario Time(seconds)</label> <br />
              <input
                type="number"
                id="scenariot"
                required
                placeholder="10"
                onChange={(e) => setScenarioTime(e.target.value)}
                value={scenarioTime}
              />
            </div>
          </div>
          <div className="buttonContainer">
            <button className="btn " id="add" type="submit">
              Add
            </button>
            <button
              className="btn orangebtn"
              id="reset"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <button className="btn" id="go-back">
              Go Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddScenarios;
