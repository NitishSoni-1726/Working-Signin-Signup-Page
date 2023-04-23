import React, { useState, useEffect } from "react";
import { dataref, db } from "./Firebase";
import { onValue, ref } from "firebase/database";
function Userinfoedit() {
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
        const option = document.querySelectorAll("option");
        for (let i = 0; i < option.length; i++) {
          if (option[i].value === newData.gender) {
            option[i].selected = true;
          }
        }
      }
    });
  }, [userId]);
  function saveClick(event) {
    event.preventDefault();

    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const dob = document.getElementById("dob").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    if (age !== "") {
      dataref.ref(`users/${userId}`).update({
        age: age,
      });
    }
    if (address !== "") {
      dataref.ref(`users/${userId}`).update({
        address: address,
      });
    }
    if (dob !== "") {
      dataref.ref(`users/${userId}`).update({
        birthdate: dob,
      });
    }
    if (gender !== "") {
      dataref.ref(`users/${userId}`).update({
        gender: gender,
      });
    }
    if (phone !== "") {
      dataref.ref(`users/${userId}`).update({
        phone: phone,
      });
    }
    document.getElementById("login").classList.add("d-none");
    document.getElementById("signup").classList.add("d-none");
    document.getElementById("user-info-edit").classList.add("d-none");
    document.getElementById("user-info").classList.remove("d-none");
    document.getElementById("user-info").classList.add("annimation");
  }
  function dateSet() {
    document.getElementById("dob").removeAttribute("type");
    document.getElementById("dob").setAttribute("type", "date");
  }
  function dateRemove() {
    document.getElementById("dob").removeAttribute("type");
    document.getElementById("dob").setAttribute("type", "text");
  }
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center content bg-warning">
        <div className="w-100 d-flex flex-column align-items-center border border-light border-3 bg-dark text-light info">
          <h3 className="m-0 mt-4">Edit Account Details</h3>
          <form
            onSubmit={saveClick}
            className=" w-100 d-flex flex-column align-items-center info p-4 m-0 mt-2"
          >
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
              <input
                type="tel"
                pattern="[0-9]{10}"
                placeholder={database.phone}
                className="border border-light border-2 p-2 bg-transparent w-100 text-light"
                id="phone"
              />
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Age</label>
              <input
                type="number"
                pattern="[0-9]{1,}"
                placeholder={database.age}
                className="border border-light border-2 p-2 bg-transparent w-100 text-light"
                id="age"
              />
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Date-Of-Birth</label>
              <input
                type="text"
                className="border border-light border-2 p-2 bg-transparent w-100 text-light"
                placeholder={database.birthdate}
                onMouseEnter={dateSet}
                onMouseLeave={dateRemove}
                id="dob"
              />
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Gender</label>
              <select
                className="border border-light border-2 p-2 bg-transparent w-100 text-light"
                id="gender"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="w-100 d-flex flex-column align-items-center justify-content-center m-2">
              <label className="w-100">Address</label>
              <input
                type="text"
                placeholder={database.address}
                className="border border-light border-2 p-2 bg-transparent w-100 text-light"
                id="address"
              />
              <button type="submit" className="btn btn-success mt-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Userinfoedit;
