import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./SCSS/Timepicker.scss";

const Timepicker = () => {
  return (
    <form className="d-flex">
      <div className="datepicker-wrapper me-3">
        <input
          type="date"
          className="form-control"
          id="startDate"
          placeholder="Start Date"
        />
      </div>
      <button className="btn btn-danger" type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default Timepicker;
