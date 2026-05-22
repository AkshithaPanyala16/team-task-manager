import { useState } from "react";
import axios from "axios";

function CreateTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleCreateTask = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://team-task-manager-production-150a.up.railway.app/api/tasks",
        {
          title,
          description,
          status
        },
        {
          headers: {
            authorization: token
          }
        }
      );

      alert(response.data.message);

    } catch (error) {

      alert("Task Creation Failed");

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
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px"
        }}
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