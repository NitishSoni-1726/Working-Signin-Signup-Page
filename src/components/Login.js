import React, { useEffect, useState } from "react";
import { db } from "./Firebase";
import { onValue, ref } from "firebase/database";
function Login() {
  const [database, setDatabase] = useState([]);
  useEffect(() => {
    const database = ref(db, "users/");
    onValue(database, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        return;
      } else {
        const newData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDatabase(newData);
      }
    });
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;
    const emaildata = loginEmail.replace(".", "");
    for (let i = 0; i < database.length; i++) {
      if (
        database[i].email === loginEmail &&
        database[i].password === loginPassword
      ) {
        document.loginform.reset();
        document.getElementById("signup").classList.add("d-none");
        document.getElementById("login").classList.add("d-none");
        document.getElementById("success-alert").classList.add("d-none");
        document.getElementById("already-alert").classList.add("d-none");
        document.getElementById("user-info").classList.add("annimation");
        document.getElementById("invalid-alert").classList.add("d-none");
        localStorage.setItem("state", true);
        localStorage.setItem("id", emaildata);
        window.location.reload(false);
      } else {
        document.getElementById("invalid-alert").classList.remove("d-none");
      }
    }
  }
  function showSignup() {
    document.getElementById("signup").classList.remove("d-none");
    document.getElementById("login").classList.add("d-none");
    document.getElementById("signup").classList.add("annimation");
    document.getElementById("user-info").classList.add("d-none");
    document.getElementById("success-alert").classList.add("d-none");
    document.getElementById("already-alert").classList.add("d-none");
  }
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center content bg-warning">
        <div className="d-flex flex-column align-items-center justify-content-center border border-danger border-1 p-5 bg-dark text-light">
          <div
            className="alert alert-danger w-100 text-center d-none"
            role="alert"
            id="invalid-alert"
          >
            Invaid Email Or Password
          </div>
          <div
            className="alert alert-success w-100 text-center d-none"
            role="alert"
            id="success-alert"
          >
            User Registered
          </div>
          <div
            className="alert alert-success w-100 text-center d-none"
            role="alert"
            id="already-alert"
          >
            User Already Registered
          </div>
          <h3>Login</h3>
          <form
            onSubmit={handleSubmit}
            name="loginform"
            className=" w-100 d-flex flex-column justify-content-center align-items-center"
          >
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                id="login-email"
                className="border border-light border-2 p-2 bg-transparent w-100 text-light"
                type="email"
                required
              />
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">
                Password <span className="text-danger">*</span>
              </label>
              <input
                className="border border-light border-2 p-2 bg-transparent w-100 text-light"
                type="password"
                id="login-password"
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-2">
              Login
            </button>
          </form>
          <div className="w-100 d-flex flex-column align-items-center justify-content-center mt-3">
            <h6 className="m-0">Don't have an account ?</h6>
            <button
              className="btn1 bg-transparent border border-0 text-light m-0"
              onClick={showSignup}
            >
              Register Here
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
