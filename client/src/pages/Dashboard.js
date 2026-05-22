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

  const interval = setInterval(() => {

    fetchProjects();
    fetchTasks();

  }, 1000);

  return () => clearInterval(interval);

}, []);

  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const response = await axios.get(
        `${backendURL}/api/projects`
      );

      console.log(response.data);

setProjects(response.data.projects || response.data);
    } catch (error) {

      console.log(error);

    }

  };

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        `${backendURL}/api/tasks`
      );

      console.log(response.data);

setTasks(response.data.tasks || response.data);
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

        {/* DASHBOARD CARDS */}

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

        {/* CREATE PROJECT */}

        <CreateProject />

        {/* PROJECT LIST */}

        <div style={{ marginTop: "30px" }}>

          <h2>Projects</h2>

          {
            projects.length === 0 ? (

              <p>No Projects Available</p>

            ) : (

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                  marginTop: "20px"
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

            )
          }

        </div>

        {/* CREATE TASK */}

        <CreateTask />

        {/* TASK LIST */}

        <div style={{ marginTop: "30px" }}>

          <h2>Tasks</h2>

          {
            tasks.length === 0 ? (

              <p>No Tasks Available</p>

            ) : (

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                  marginTop: "20px"
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

            )
          }

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