import { useState } from "react";
import axios from "axios";

function CreateProject() {

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateProject = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://team-task-manager-production.up.railway.app/api/projects",
        {
          projectName,
          description
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );

      alert(response.data.message);

      setProjectName("");
      setDescription("");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Failed to create project");

    }

  };

  return (

    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h2>Create Project</h2>

      <form onSubmit={handleCreateProject}>

        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Create Project
        </button>

      </form>

    </div>

  );

}

export default CreateProject;