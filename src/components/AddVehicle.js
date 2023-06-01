import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVehicle = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [speed, setSpeed] = useState("");
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const [directionName, setDirectionName] = useState("");
  // const [scenarioName, setScenarioName] = useState("");
  const [scenarioId, setScenarioId] = useState(-"");
  const [data, setData] = useState([]);

  const url = "http://localhost:3001/scenarios";
  useEffect(() => {
    getScenario();
  }, []);
  function getScenario() {
    fetch(url).then((result) => {
      result.json().then((response) => {
        // console.log("Result", response);
        setData(response);
        // console.log(response.id);
        // console.log(response);
      });
    });
  }

  const handleSubmitVehicle = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("vehiclename", vehicleName);

    formData.set("speed", speed);

    formData.set("positionx", positionX);

    formData.set("positiony", positionY);

    formData.set("directionname", setDirectionName);
    // formData.set("scenarioName", setScenarioName);
    formData.set("scenarioId", setScenarioId);

    const url = "http://localhost:3001/vehicles";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: "",
        scenarioId: scenarioId,
        vehiclename: vehicleName,
        speed: speed,
        positionx: positionX,
        positiony: positionY,
        directionname: directionName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Hello From Add Vehicle!");
        toast.success(`Vehicle has been added Successfully as id : ${data.id}`);
      })
      .catch((error) => console.error(error));
  };

  const handleReset = () => {
    setVehicleName("");
    setSpeed("");
    setPositionX("");
    setPositionY("");
  };

  return (
    <>
      <div className="addVehicleMain">
        <ToastContainer />
        <h2>Add Vehicle</h2>
        <form method="post" id="form" onSubmit={handleSubmitVehicle}>
          <div className="inputGroups">
            <div>
              <label htmlFor="scenario-list">Scenario list : </label>
              <select
                name="scenarioList"
                id="scenario-list"
                required
                onChange={(e) => {
                  setScenarioId(e.target.value);
                }}
              >
                <option value=""> Select Scenario </option>
                {data.map((obj) => {
                  return (
                    <option
                      key={obj.name}
                      value={obj.id}
                    >
                      id:{obj.id}, {obj.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label htmlFor="VehicleName">Vehicle Name : </label>
              <input
                required
                placeholder="Target abc"
                type="text"
                id="VehicleName"
                onChange={(e) => setVehicleName(e.target.value)}
                value={vehicleName}
              />
            </div>
            <div>
              <label htmlFor="speed">Speed : </label>
              <input
                required
                placeholder="2"
                type="number"
                id="speed"
                onChange={(e) => setSpeed(e.target.value)}
                value={speed}
              />
            </div>
            <div>
              <label htmlFor="positionX">Position X : </label>
              <input
                required
                placeholder="20"
                type="number"
                min={0}
                max={800}
                id="positionX"
                onChange={(e) => setPositionX(e.target.value)}
                value={positionX}
              />
            </div>
            <div>
              <label htmlFor="positionY">Position Y : </label>
              <input
                required
                placeholder="20"
                type="number"
                min={0}
                max={800}
                id="positionY"
                onChange={(e) => setPositionY(e.target.value)}
                value={positionY}
              />
            </div>
            <div>
              <label htmlFor="direction">Direction : </label>
              <select
                required
                name="direction"
                id="direction"
                value={directionName}
                onChange={(e) => setDirectionName(e.target.value)}
              >
                <option value=""> Select Direction </option>
                <option value="towords">Towords</option>
                <option value="backwords">Backwords</option>
                <option value="upwords">Upwords</option>
                <option value="downwords">Downwords</option>
              </select>
            </div>
          </div>

          <div className="buttonContainer1">
            <button type="submit" id="addvehicle">Add</button>
            <button type="reset" id="resetvehicle" onClick={handleReset}>Reset</button>
            <button id="go-back-vehicle">Go Back</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddVehicle;
