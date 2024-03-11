import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Timepicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="datepicker-wrapper"> 
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="dateDiv"
      />
    </div>
  );
};

export default Timepicker;
