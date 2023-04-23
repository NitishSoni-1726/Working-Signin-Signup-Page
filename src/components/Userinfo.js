import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import { onValue, ref } from "firebase/database";
function Userinfo() {
  const userId = localStorage.getItem("id");
  const [database, setDatabase] = useState([]);
  useEffect(() => {
    const database = ref(db, `users/${userId}/`);
    onValue(database, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        return;
      } else {
        const newData = Object.create(data);
        setDatabase(newData);
        document.getElementById("loading").classList.add("d-none");
        document.getElementById("info").classList.remove("d-none");
      }
    });
  }, [userId]);
  function editClick() {
    document.getElementById("login").classList.add("d-none");
    document.getElementById("signup").classList.add("d-none");
    document.getElementById("user-info").classList.add("d-none");
    document.getElementById("user-info-edit").classList.add("annimation");
    document.getElementById("user-info-edit").classList.remove("d-none");
  }
  function logoutClick() {
    document.getElementById("signup").classList.add("d-none");
    document.getElementById("user-info").classList.add("d-none");
    document.getElementById("user-info-edit").classList.add("d-none");
    document.getElementById("login").classList.remove("d-none");
    document.getElementById("login").classList.add("annimation");
    localStorage.removeItem("state");
    localStorage.removeItem("id");
  }
  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center content">
        <div
          className="d-flex flex-column justify-content-center align-items-center mt-1 bg-dark loading border border-light border-3"
          id="loading"
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="text-light mt-2">Loading...</span>
        </div>
        <div
          className="w-100 d-flex flex-column align-items-center border border-light border-3 bg-dark text-light d-none info"
          id="info"
        >
          <h3 className="m-0 mt-4">Account Details</h3>
          <div className="w-100 d-flex flex-column align-items-center info w-100 p-4 m-0 mt-2">
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Email Address</label>
              <div className="border border-light border-2 p-2 bg-transparent w-100 text-light details">
                {database.email}
              </div>
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">User Name</label>
              <div className="border border-light border-2 p-2 bg-transparent w-100 text-light details">
                {database.username}
              </div>
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Phone Number</label>
              <div className="border border-light border-2 p-2 bg-transparent w-100 text-light details">
                {database.phone}
              </div>
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Age</label>
              <div className="border border-light border-2 p-2 bg-transparent w-100 text-light details">
                {database.age}
              </div>
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Date-Of-Birth</label>
              <div className="border border-light border-2 p-2 bg-transparent w-100 text-light details">
                {database.birthdate}
              </div>
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Gender</label>
              <div className="border border-light border-2 p-2 bg-transparent w-100 text-light details">
                {database.gender}
              </div>
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Address</label>
              <div className="border border-light border-2 p-2 bg-transparent w-100 text-light details">
                {database.address}
              </div>
            </div>
            <button className="btn btn-success mt-2" onClick={editClick}>
              Edit
            </button>
            <button className="btn btn-danger mt-2" onClick={logoutClick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userinfo;
