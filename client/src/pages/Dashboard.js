import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import CreateProject from "./CreateProject";
import CreateTask from "./CreateTask";

function Dashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetchProjects();
    fetchTasks();

  }, []);

  const fetchProjects = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://team-task-manager-production.up.railway.app/api/projects",
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
        "https://team-task-manager-production.up.railway.app/api/tasks",
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

  const updateTaskStatus = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `https://team-task-manager-production.up.railway.app/api/tasks/${id}`,
        {
          status: "Completed"
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://team-task-manager-production.up.railway.app/api/tasks/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteProject = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://team-task-manager-production.up.railway.app/api/projects/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );

      fetchProjects();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      style={{
        backgroundColor: "#f1f5f9",
        minHeight: "100vh",
        paddingBottom: "50px"
      }}
    >

      <Navbar />

      <div
        style={{
          width: "90%",
          margin: "auto",
          paddingTop: "30px"
        }}
      >

        <h1>Dashboard</h1>

        <p>Welcome to Team Task Manager 🚀</p>

        <CreateProject />

        <CreateTask />

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            marginBottom: "30px"
          }}
        >

          <div
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "200px"
            }}
          >
            <h3>Total Projects</h3>
            <p>{projects.length}</p>
          </div>

          <div
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "200px"
            }}
          >
            <h3>Total Tasks</h3>
            <p>{tasks.length}</p>
          </div>

        </div>

        <h2
          style={{
            marginBottom: "20px",
            color: "#1e293b"
          }}
        >
          Projects
        </h2>

        {
          projects.map((project) => (

            <div
              key={project._id}
              style={{
                backgroundColor: "white",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >

              <h3>{project.projectName}</h3>

              <p>{project.description}</p>

              <button
                onClick={() => deleteProject(project._id)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px"
                }}
              >
                Delete Project
              </button>

            </div>

          ))
        }

        <h2
          style={{
            marginTop: "40px",
            marginBottom: "20px",
            color: "#1e293b"
          }}
        >
          Tasks
        </h2>

        {
          tasks.map((task) => (

            <div
              key={task._id}
              style={{
                backgroundColor: "white",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >

              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p
                style={{
                  color:
                    task.status === "Completed"
                      ? "green"
                      : task.status === "In Progress"
                      ? "blue"
                      : "orange",
                  fontWeight: "bold"
                }}
              >
                Status: {task.status}
              </p>

              <button
                onClick={() => updateTaskStatus(task._id)}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px"
                }}
              >
                Mark as Completed
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  marginLeft: "10px"
                }}
              >
                Delete
              </button>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default Dashboard;