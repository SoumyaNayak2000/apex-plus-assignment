import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscTrash } from "react-icons/vsc";
import { FaPlusCircle, FaEdit } from "react-icons/fa";

const AllScenarios = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [myStyle, setMyStyle] = useState({
    display: "none",
  });
  const [showTable, setShowTable] = useState(true);

  const url = "http://localhost:3001/scenarios";
  useEffect(() => {
    getTable();
  }, []);

  function getTable() {
    fetch(url).then((result) => {
      result.json().then((response) => {
        if (response.length > 0) {
          setData(response);
          setId(response[0].id);
          setName(response[0].name);
          setTime(response[0].time);
        } else {
          setShowTable(false);
        }
      });
    });
  }
  function selectScenario(id) {
    const url = `http://localhost:3001/scenarios?id=${id}`;
    fetch(url).then((result) => {
      result.json().then((response) => {
        setId(response[0].id);
        setName(response[0].name);
        setTime(response[0].time);
      });
    });
    if (myStyle.display === "none") {
      setMyStyle({
        display: "block",
      });
    }
  }

  function updateScenario(id) {
    // console.log(id, name, time);
    const item = { id, name, time };
    fetch(`http://localhost:3001/scenarios/${id}`, {
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
    if (myStyle.display === "block") {
      setMyStyle({
        display: "none",
      });
    }
  }

  function deleteScenario(id) {
    console.log(id);
    fetch(`http://localhost:3001/scenarios/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((result) => {
        toast.warn(`Scenario id ${id} has been Deleted Successfully`);
        getTable();
      });
    });
  }
  return (
    <>
      <ToastContainer />
      <div className=" allScenariosContainer">
        <div className="allscenariosBar">
          <h2>All Scenarios</h2>
          <div className="allsceneBtns">
            <button className="newScenario">
              <Link to={"/add-scenario"}> New Scenario </Link>
            </button>
            <button className="addVehicle">
              <Link to="/add-vehicle">Add Vehicle</Link>
            </button>

            <button
              className="deleteAll"
              type="submit"
              // onClick={deleteAllScenario}
            >
              Delete All
            </button>
          </div>
        </div>

        {showTable ? (
          <div className="home-table">
            <table className="tableMain">
              <tr >
                <th className="table-heading">Scenario Id</th>
                <th className="table-heading">Scenario Name</th>
                <th className="table-heading">Scenario Time</th>
                <th className="table-heading">Number of vehicales</th>
                <th className="table-heading">Add Vehicale</th>
                <th className="table-heading">Edit</th>
                <th className="table-heading">Delete</th>
              </tr>

              {data.map((obj) => {
                return (
                  <tr className="allScenarios-row">
                    <td className="table-data">{obj.id}</td>
                    <td className="table-data">{obj.name}</td>
                    <td className="table-data">{obj.time}s</td>
                    <td className="table-data">To-Do</td>
                    {/* {getNoOfVehicle(obj.id)} */}
                    <td>
                      <button type="submit" className="addV">
                        <Link to="/add-vehicle">
                          <FaPlusCircle />
                        </Link>
                      </button>
                    </td>
                    <td>
                      <button
                        type="edit"
                        onClick={() => selectScenario(obj.id)}
                        className="addV"
                      >
                        <FaEdit />
                      </button>
                    </td>

                    <td>
                      <button
                        type="submit"
                        onClick={() => deleteScenario(obj.id)}
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
            No Scenario found,&nbsp;{" "}
            <Link to="/add-scenario"> Click here </Link> &nbsp;To add scenario!.
          </div>
        )}
        <div className="updatePage" style={myStyle}>
          <h2>Update Scenario</h2>

          <div>
            <label htmlFor="iid">ID: </label>
            <input
              type="text"
              name="iid"
              id="iid"
              value={id}
              disabled
              readOnly
            />
          </div>
          <div>
            <label htmlFor="name">Scenario Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="time">Scenario Time:</label>
            <input
              type="number"
              name="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <button onClick={() => updateScenario(id)}>Update Scenario</button>
        </div>
      </div>
    </>
  );
};

export default AllScenarios;
