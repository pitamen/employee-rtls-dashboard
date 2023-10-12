import React from 'react';
import backgroundImg from '../img/NamebarBg.jpg'; // Replace with the actual path to your background image

const Namebar = () => {
    const namebarStyle = {
      backgroundImage: `url(${backgroundImg})`, // Use the imported image
      backgroundSize: 'cover', // Adjust as needed
      backgroundRepeat: 'no-repeat', // Adjust as needed
      padding: '1px',
      color: 'white',
    };
  
    return (
      <div style={namebarStyle}>
        <h2>Live Employee Locations</h2>
      </div>
    );
  };
  
  export default Namebar;