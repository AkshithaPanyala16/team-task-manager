import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import CreateProject from "./CreateProject";
import CreateTask from "./CreateTask";

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const backendURL =
    "https://team-task-manager-production-150a.up.railway.app";

  useEffect(() => {

    fetchProjects();
    fetchTasks();

  }, []);

  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${backendURL}/api/projects`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );

      setProjects(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${backendURL}/api/tasks`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <Navbar />

      <div
        style={{
          padding: "30px"
        }}
      >

        <h1>Dashboard</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "20px"
          }}
        >

          <div style={cardStyle}>
            <h2>Total Projects</h2>
            <p>{projects.length}</p>
          </div>

          <div style={cardStyle}>
            <h2>Total Tasks</h2>
            <p>{tasks.length}</p>
          </div>

          <div style={cardStyle}>
            <h2>Completed</h2>
            <p>
              {
                tasks.filter(
                  (task) => task.status === "Completed"
                ).length
              }
            </p>
          </div>

          <div style={cardStyle}>
            <h2>Pending</h2>
            <p>
              {
                tasks.filter(
                  (task) => task.status === "Pending"
                ).length
              }
            </p>
          </div>

        </div>

        <CreateProject />

        <div style={{ marginTop: "20px" }}>

          <h2>Projects</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px"
            }}
          >

            {
              projects.map((project) => (

                <div
                  key={project._id}
                  style={cardStyle}
                >

                  <h3>{project.projectName}</h3>

                  <p>{project.description}</p>

                </div>

              ))
            }

          </div>

        </div>

        <CreateTask />

        <div style={{ marginTop: "20px" }}>

          <h2>Tasks</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px"
            }}
          >

            {
              tasks.map((task) => (

                <div
                  key={task._id}
                  style={cardStyle}
                >

                  <h3>{task.title}</h3>

                  <p>{task.description}</p>

                  <p>
                    Status:
                     <span
    style={{
      color:
        task.status === "Completed"
          ? "green"
          : task.status === "Pending"
          ? "red"
          : "orange",
      fontWeight: "bold"
    }}
  >
    {" "}
    {task.status}
  </span>
                  </p>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );

}

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

export default Dashboard;