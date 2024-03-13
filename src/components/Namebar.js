import React from 'react';
import backgroundImg from '../img/NamebarBg.jpg'; 

const Namebar = () => {
    const namebarStyle = {
      backgroundImage: `url(${backgroundImg})`, // Use the imported image
      backgroundSize: 'cover', // Adjust as needed
      backgroundRepeat: 'no-repeat', // Adjust as needed
      color: 'white',
    };
  
    return (
      <div style={namebarStyle}>
        <h3 className='text-center py-0.5'>Live Technician Locations</h3>
      </div>
    );
  };
  
  export default Namebar;