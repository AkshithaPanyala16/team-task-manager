import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {

  const token = localStorage.getItem("token");

  return (

    <div>

      {
        token ? <Dashboard /> : <Login />
      }

    </div>

  );

}

export default App;