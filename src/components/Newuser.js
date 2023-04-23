import React, { useEffect, useState } from "react";
import { dataref, db } from "./Firebase";
import { onValue, ref } from "firebase/database";
function Newuser() {
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
  function checkUser() {
    const signupEmail = document.getElementById("signup-email").value;
    for (let i = 0; i < database.length; i++) {
      if (database[i].email === signupEmail) {
        document.getElementById("login").classList.remove("d-none");
        document.getElementById("login").classList.add("annimation");
        document.getElementById("already-alert").classList.remove("d-none");
        document.signupform.reset();
      }
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    const signupPassword = document.getElementById("signup-password").value;
    const signupUsername = document.getElementById("signup-username").value;
    const signupEmail = document.getElementById("signup-email").value;
    const emaildata = signupEmail.replace(".", "");
    dataref.ref(`users/${emaildata}`).set({
      username: signupUsername,
      email: signupEmail,
      password: signupPassword,
    });
    document.signupform.reset();
    document.getElementById("login").classList.remove("d-none");
    document.getElementById("login").classList.add("annimation");
    document.getElementById("success-alert").classList.remove("d-none");
    both();
  }
  function passwordAuthentication() {
    const signupPassword = document.getElementById("signup-password").value;
    const specialCharacter = document.getElementById("special-character");
    const passwordLength = document.getElementById("password-length");
    if (signupPassword === "") {
      specialCharacter.style.color = "white";
      passwordLength.style.color = "white";
    } else {
      let specialcharacter = /[#,?,!,@,$,%,^,&,*,-,]/g;
      if (signupPassword.match(specialcharacter)) {
        specialCharacter.style.color = "green";
      } else {
        specialCharacter.style.color = "red";
      }
      if (signupPassword.length >= 6) {
        passwordLength.style.color = "green";
      } else {
        passwordLength.style.color = "red";
      }
    }
  }
  function both() {
    passwordAuthentication();
    passwordCheck();
  }
  function passwordCheck() {
    const signupPassword = document.getElementById("signup-password").value;
    const signupConfirmPassword = document.getElementById(
      "signup-confirm-password"
    ).value;
    if (signupConfirmPassword === "" || signupPassword === "") {
      document
        .getElementById("signup-password")
        .classList.remove("border-danger");
      document
        .getElementById("signup-password")
        .classList.remove("border-danger");
      document
        .getElementById("signup-confirm-password")
        .classList.remove("border-success");
      document
        .getElementById("signup-password")
        .classList.remove("border-success");
      document.getElementById("signup-password").classList.add("border-light");
      document
        .getElementById("signup-confirm-password")
        .classList.add("border-light");
    } else if (signupPassword === signupConfirmPassword) {
      document
        .getElementById("signup-password")
        .classList.remove("border-danger");
      document
        .getElementById("signup-confirm-password")
        .classList.remove("border-light");
      document
        .getElementById("signup-password")
        .classList.remove("border-light");
      document
        .getElementById("signup-confirm-password")
        .classList.remove("border-danger");
      document
        .getElementById("signup-confirm-password")
        .classList.add("border-success");
      document
        .getElementById("signup-password")
        .classList.add("border-success");
      document.getElementById("signup-submit").removeAttribute("disabled");
    } else if (signupPassword !== signupConfirmPassword) {
      document
        .getElementById("signup-confirm-password")
        .classList.remove("border-success");
      document
        .getElementById("signup-password")
        .classList.remove("border-success");
      document
        .getElementById("signup-password")
        .classList.remove("border-light");
      document
        .getElementById("signup-confirm-password")
        .classList.remove("border-light");
      document.getElementById("signup-password").classList.add("border-danger");
      document
        .getElementById("signup-confirm-password")
        .classList.add("border-danger");
      document.getElementById("signup-submit").setAttribute("disabled", "true");
    }
  }
  function showLogin() {
    document.getElementById("signup").classList.add("d-none");
    document.getElementById("login").classList.remove("d-none");
    document.getElementById("login").classList.add("annimation");
    document.getElementById("user-info").classList.add("d-none");
  }
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center content bg-warning">
        <div className="d-flex flex-column align-items-center justify-content-center border border-danger border-1 p-5 bg-dark text-light">
          <h3>Register</h3>
          <form
            onSubmit={handleSubmit}
            name="signupform"
            className=" w-100 d-flex flex-column justify-content-center align-items-center"
          >
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                id="signup-email"
                className="border border-light border-2 p-2 bg-transparent w-100 text-light"
                type="email"
                onBlur={checkUser}
                required
              />
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">
                User Name <span className="text-danger">*</span>
              </label>
              <input
                id="signup-username"
                className="border border-light border-2 p-2 bg-transparent w-100 text-light"
                type="text"
                required
              />
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">
                Password <span className="text-danger">*</span>
              </label>
              <input
                id="signup-password"
                className="border border-2 p-2 bg-transparent w-100 text-light"
                type="password"
                pattern="(?=.*?[#?!@$%^&*-]).{6,}"
                onKeyUp={both}
                required
              />
              <p className="m-0 mt-2">
                Atleast one{" "}
                <span id="special-character">Special Characater</span> <br></br>
                and Min-Length should be <span id="password-length">6</span>
              </p>
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <input
                className="border border-2 p-2 bg-transparent w-100 text-light"
                type="password"
                id="signup-confirm-password"
                onKeyUp={passwordCheck}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success mt-2"
              id="signup-submit"
            >
              Register
            </button>
          </form>
          <div className="w-100 d-flex flex-column align-items-center justify-content-center mt-3">
            <h6 className="m-0">Already have an account ?</h6>
            <button
              className="btn1 bg-transparent border border-0 text-light m-0"
              onClick={showLogin}
            >
              Login Here
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newuser;
