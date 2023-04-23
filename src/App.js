import { useEffect } from "react";
import Login from "./components/Login";
import Newuser from "./components/Newuser";
import Userinfo from "./components/Userinfo";
import Userinfoedit from "./components/Userinfoedit";

function App() {
  useEffect(() => {
    hell();
  });
  function hell() {
    const state = localStorage.getItem("state");
    if (state === null) {
      document.getElementById("signup").classList.remove("d-none");
    } else if (state === "true") {
      document.getElementById("user-info").classList.remove("d-none");
    }
  }
  return (
    <>
      <div className="container">
        <div className="d-none" id="login">
          <Login />
        </div>
        <div className="d-none" id="signup">
          <Newuser />
        </div>
        <div className="d-none" id="user-info">
          <Userinfo />
        </div>
        <div className="d-none" id="user-info-edit">
          <Userinfoedit />
        </div>
      </div>
    </>
  );
}

export default App;
