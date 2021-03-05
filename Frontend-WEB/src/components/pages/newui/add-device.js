import React, { useState } from "react";

const AddDevice = () => {
  const [devices, setDevices] = useState([]);
  const [component, setComponent] = useState({
    componentId: "",
    category: "",
    brand: "",
    model: "",
    Position: "",
  });

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <article>
        <div className="title-addDevice">
          <h2>Add Config Data</h2>
        </div>
        <form className="form-comp">
          <div className="form-comp-control">
            <label htmlFor="compId">Comp. ID : </label>
            <input
              type="text"
              id="compId"
              name="compId"
              value={component.componentId}
              onChange={handleChange}
            />
          </div>
          <div className="form-comp-control">
            <label htmlFor="category">Category : </label>
            <input
              type="category"
              id="category"
              name="category"
              value={component.category}
              onChange={handleChange}
            />
          </div>
          <div className="form-comp-control">
            <label htmlFor="brand">Brand : </label>
            <input
              type="brand"
              id="brand"
              name="brand"
              value={component.brand}
              onChange={handleChange}
            />
          </div>
          <div className="form-comp-control">
            <label htmlFor="model">Model : </label>
            <input
              type="model"
              id="model"
              name="model"
              value={component.model}
              onChange={handleChange}
            />
          </div>

          <button className="btn" type="submit" onClick={handleSubmit}>
            Save
          </button>
          <button className="btn">Cancel</button>
        </form>
        {/* {people.map((person, index) => {
          const { id, firstName, age, email } = person;
          return (
            <div className="item" key={id}>
              <h4>{firstName}</h4>
              <p>{age}</p>
              <p>{email}</p>
            </div>
          );
        })} */}
      </article>
    </>
  );
};

export default AddDevice;
