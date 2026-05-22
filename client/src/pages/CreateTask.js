import { useState } from "react";
import axios from "axios";

function CreateTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://team-task-manager-production.up.railway.app/api/tasks",
        {
          title,
          description
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );

      alert(response.data.message);

      setTitle("");
      setDescription("");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Failed to create task");

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

      <h2>Create Task</h2>

      <form onSubmit={handleCreateTask}>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px"
          }}
        />

        <textarea
          placeholder="Task Description"
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
            backgroundColor: "#16a34a",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Create Task
        </button>

      </form>

    </div>

  );

}

export default CreateTask;