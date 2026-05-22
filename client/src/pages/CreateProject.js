import { useState } from "react";
import axios from "axios";

function CreateProject() {

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const backendURL =
    "https://team-task-manager-production-150a.up.railway.app";

  const handleCreateProject = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${backendURL}/api/projects`,
        {
          projectName,
          description
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      alert("Project Created Successfully");

      setProjectName("");
      setDescription("");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Project Creation Failed");

    }

  };

  return (

    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "10px",
        marginTop: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h2>Create Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleCreateProject}>
        Create Project
      </button>

    </div>

  );

}

export default CreateProject;