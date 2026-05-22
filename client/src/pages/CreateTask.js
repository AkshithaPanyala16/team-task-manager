import { useState } from "react";
import axios from "axios";

function CreateTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const backendURL =
    "https://team-task-manager-production-150a.up.railway.app";

  const handleCreateTask = async () => {

    try {

      const response = await axios.post(
        `${backendURL}/api/tasks`,
        {
          title,
          description,
          status
        }
      );

      alert(response.data.message);

      window.location.reload();

    } catch (error) {

      alert("Task Creation Failed");

      console.log(error);

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

      <h2>Create Task</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >

        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>

      </select>

      <button onClick={handleCreateTask}>
        Create Task
      </button>

    </div>

  );

}

export default CreateTask;