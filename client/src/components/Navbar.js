function Navbar() {

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  return (

    <div
      style={{
        backgroundColor: "#1e293b",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <h2>Team Task Manager</h2>

      <div>

        <span style={{ marginRight: "20px" }}>
          Dashboard
        </span>

        <span style={{ marginRight: "20px" }}>
          Projects
        </span>

        <span style={{ marginRight: "20px" }}>
          Tasks
        </span>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;