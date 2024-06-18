import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SCSS/Timepicker.scss"

const Timepicker = () => {
  const [startDate, setStartDate] = useState(null); // Use null for no initial date
  const [defaultText, setDefaultText] = useState("Select a Date"); // Define default text

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleClearDate = () => {
    setStartDate(null); // Clear selected date
  };

  return (
    <form className="d-flex" role="datepick">
      <div className="datepicker-wrapper mx-4">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          className="dateDiv"
          placeholderText={defaultText} // Use placeholder for default text
          renderInput={(params) => (
            <div className="date-input-container">
              {/* Display default text if no date selected */}
              {!startDate && <span className="default-date-text">{defaultText}</span>}
              <input {...params} />
              {/* Add a clear button if a date is selected */}
              {startDate && (
                <button type="button" className="clear-date-btn" onClick={handleClearDate}>
                  <i className="fas fa-times"></i> {/* Use FontAwesome icon for clarity */}
                </button>
              )}
            </div>
          )}
        />
      </div>
      <button className="btn btn-danger" type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default Timepicker;