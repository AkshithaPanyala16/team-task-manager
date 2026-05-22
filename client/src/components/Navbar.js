function Navbar() {

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };

  return (

    <div
      style={{
        backgroundColor: "#2563eb",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <h2>Team Task Manager</h2>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "white",
          color: "#2563eb"
        }}
      >
        Logout
      </button>

    </div>

  );

}

export default Navbar;