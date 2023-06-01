import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscTrash } from "react-icons/vsc";
import {  FaEdit } from "react-icons/fa";

const Home = () => {
  // const [toShowDataV, setToShowDataV] = useState([])
  const [data, setData] = useState([]);
  const [datav, setDatav] = useState([]);
  const [id, setId] = useState("");
  const [vehiclename, setVehicleName] = useState("");
  const [speed, setSpeed] = useState("");
  const [positionx, setPositionX] = useState("");
  const [positiony, setPositionY] = useState("");
  const [directionname, setDirectionName] = useState("");
  const [showTable, setShowTable] = useState(true);
  const [myStyle, setMyStyle] = useState({
    display: "none",
  });

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
  const url1 = "http://localhost:3001/vehicles";
  useEffect(() => {
    getVehicles();
  }, []);
  function getVehicles() {
    fetch(url1).then((result) => {
      result.json().then((response) => {
        // console.log("Result", response);
        setDatav(response);
        // console.log(response.id);
        // console.log(response);
      });
    });
  }

  function selectVehicle(id) {
    const url2 = `http://localhost:3001/vehicles?id=${id}`;
    fetch(url2).then((result) => {
      result.json().then((response) => {
        // console.log("Result", response);
        setId(response[0].id);
        setVehicleName(response[0].vehiclename);
        setSpeed(response[0].speed);
        setPositionX(response[0].positionx);
        setPositionY(response[0].positiony);
        setDirectionName(response[0].directionname);
      });
    });
    if (myStyle.display === "none") {
      setMyStyle({
        display: "flex",
      });
    }
  }

  function getTable() {
    fetch(url1).then((result) => {
      result.json().then((response) => {
        if (response.length > 0) {
          setDatav(response);
          setId(response[0].id);
          setVehicleName(response[0].vehiclename);
          setSpeed(response[0].speed);
          setPositionX(response[0].positionx);
          setSpeed(response[0].positiony);
          setPositionY(response[0].speed);
          setDirectionName(response[0].directionname);
        } else {
          setShowTable(false);
        }
      });
    });
  }

  function updateVehicle(id) {
    const item = {
      id,
      vehiclename,
      positionx,
      positiony,
      speed,
      directionname,
    };
    fetch(`http://localhost:3001/vehicles/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((response) => {
        getTable();
        toast.success(`Scenario id ${id} is Updated Successfully`);
      });
    });
    if (myStyle.display === "flex") {
      setMyStyle({
        display: "none",
      });
    }
  }

  function deleteVehicle(id) {
    console.log(id);
    fetch(`http://localhost:3001/vehicles/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((result) => {
        toast.warn(`Scenario id ${id} has been Deleted Successfully`);
        getTable();
      });
    });
  }

  function getVehicleByScenarioId(scenarioid){
    console.log(scenarioid);
    fetch(`http://localhost:3001/vehicles`, {
      method: "GET",
    }).then((result) => {
      result.json().then((result) => {
        const varr = result.filter((vehicle) => vehicle.scenarioId === scenarioid);
        setDatav(varr);
      });
    });
  }



  return (
    <>
      <ToastContainer />
      <div className="main-Home">
        <div className="homeScenario">
          <label htmlFor="homeScenario">Scenario Names</label>
          
          <select name="scenariosName" id="homeScenario" onChange={(e) => getVehicleByScenarioId(e.target.value)} >
            <option value="">Select Scenario</option>
            {data.map((obj) => {
              return (
                <option key={obj.name} value={obj.id}>
                  {obj.name}
                </option>
              );
            })}
          </select>
        </div>
        {showTable ? (
          <div className="home-table">
            <table className="tableMain">
              <tr>
                <th className="table-heading">Vehicle Id</th>
                <th className="table-heading">Vehicle Name</th>
                <th className="table-heading">Position X</th>
                <th className="table-heading">Position Y</th>
                <th className="table-heading">Speed</th>
                <th className="table-heading">Direction</th>
                <th className="table-heading">Edit</th>
                <th className="table-heading">Delete</th>
              </tr>

              {datav.map((obj) => {
                return (
                  <tr className="allScenarios-row">
                    <td className="table-data">{obj.id}</td>
                    <td className="table-data">{obj.vehiclename}</td>
                    <td className="table-data">{obj.positionx}</td>
                    <td className="table-data">{obj.positiony}</td>
                    <td className="table-data">{obj.speed}</td>
                    <td className="table-data">{obj.directionname}</td>
                    <td className="table-data">
                      <button
                        type="edit"
                        onClick={() => selectVehicle(obj.id)}
                        className="addV"
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td className="table-data">
                      <button
                        type="submit"
                        onClick={() => deleteVehicle(obj.id)}
                        className="addV"
                      >
                        <VscTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <div className="elsesent">
            No Vehicle found,&nbsp; <Link to="/add-vehicle"> Click here </Link>{" "}
            &nbsp;To add vehicle!.
          </div>
        )}

        <div className="home-btns allsceneBtns">
          <button className="startSimulation">Start Simulation</button>
          <button className="stopSimulation">Stop Simulation</button>
        </div>
        <div className="vehicle-update" style={myStyle}>
          <h2>Update Vehicle</h2>

          <div>
            <label htmlFor="vid">ID: </label>
            <input
              type="text"
              name="iid"
              id="vid"
              value={id}
              disabled
              readOnly
            />
          </div>
          <div>
            <label htmlFor="vname">Vehicle Name:</label>
            <input
              type="text"
              name="name"
              id="vname"
              value={vehiclename}
              onChange={(e) => setVehicleName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="positionx">Position X</label>
            <input
              type="number"
              name="time"
              id="positionx"
              value={positionx}
              onChange={(e) => setPositionX(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="positiony">Position Y</label>
            <input
              type="number"
              name="time"
              id="positiony"
              value={positiony}
              onChange={(e) => setPositionY(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="speed">Speed</label>
            <input
              type="number"
              name="time"
              id="speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="direction">Direction</label>
            <select
              name="direction"
              id="direction"
              value={directionname}
              onChange={(e) => setDirectionName(e.target.value)}
            >
              <option value="towords">Towords</option>
              <option value="upwords">Upwords</option>
              <option value="backwords">Backwords</option>
              <option value="downwords">Downwords</option>
            </select>
          </div>
          <button onClick={() => updateVehicle(id)}>Update Scenario</button>
        </div>
      </div>
    </>
  );
};

export default Home;
