import React, { useState, useEffect } from "react";
import ContactForms from "./ContactForms";
import firebase from "../firebase";
import Swal from "sweetalert2";
import "../App.css";
function Contacts() {
  var [contacts, setContacts] = useState({});
  var [currentId, setCurrentId] = useState("");
  useEffect(() => {
    firebase.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setContacts({
          ...snapshot.val(),
        });
      else setContacts({});
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "")
      firebase.child("contacts").push(obj, (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        if (err) console.log(err);
        else setCurrentId("");
      });
    else
      firebase.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };
  const deleteuser = (key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        firebase.child(`contacts/${key}`).remove((err) => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          if (err) console.log(err);
          else setCurrentId("");
        });
      }
    });
    // if (window.confirm("Are You sure want to delete")) {
    //   firebase.child(`contacts/${key}`).remove((err) => {
    //     if (err) console.log(err);
    //     else setCurrentId("");
    //   });
    // }
  };
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contacts Registration</h1>
        </div>
        <p className="text-center myname">Aman sharma</p>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForms {...{ addOrEdit, currentId, contacts }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>FullName</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {console.log(Object.keys(contacts), "ss")}
              {Object.keys(contacts).length > 0 ? (
                Object.keys(contacts).map((id) => {
                  return (
                    <tr key={id}>
                      {console.log(contacts[id])}
                      <td>{contacts[id].fullname}</td>
                      <td>{contacts[id].email}</td>
                      <td>{contacts[id].mobile}</td>
                      <td>{contacts[id].address}</td>
                      <td>
                        <a
                          className="btn text-primary"
                          onClick={() => {
                            setCurrentId(id);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        <a
                          className="btn text-danger"
                          onClick={() => {
                            deleteuser(id);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr
                  className="spinner-border d-flex justify-content-center"
                  role="status"
                >
                  <td className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
