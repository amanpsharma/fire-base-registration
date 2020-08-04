import React, { useState, useEffect } from "react";

function ContactForms(props) {
  const intialState = {
    fullname: "",
    mobile: "",
    email: "",
    address: "",
  };

  var [values, setValue] = useState(intialState);

  useEffect(() => {
    if (props.currentId === "") setValue({ ...intialState });
    else setValue({ ...props.contacts[props.currentId] });
  }, [props.currentId, props.contacts]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
  };
  const handleForm = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };
  return (
    <div>
      <form autoComplete="off" onSubmit={handleForm}>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="full name"
            name="fullname"
            value={values.fullname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group input-group col-md-6">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-envelope"></i>
              </div>
            </div>
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group input-group col-md-6">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="fas fa-mobile-alt"></i>
              </div>
            </div>
            <input
              className="form-control"
              placeholder="Mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Address"
            value={values.address}
            name="address"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="btn btn-primary btn-block"
            type="submit"
            value={props.currentId === "" ? "Save" : "Update"}
          />
        </div>
      </form>
    </div>
  );
}

export default ContactForms;
