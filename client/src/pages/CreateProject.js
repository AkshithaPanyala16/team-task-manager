import { useState } from "react";
import axios from "axios";

function CreateProject() {

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateProject = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://team-task-manager-production-150a.up.railway.app/api/projects",
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

      alert(response.data.message);
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
        marginTop: "20px",
        borderRadius: "10px"
      }}
    >

      <h2>Create Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={handleCreateProject}>
        Create Project
      </button>

    </div>

  );

}

export default CreateProject;