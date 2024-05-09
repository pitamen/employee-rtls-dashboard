import React from 'react';
import backgroundImg from '../img/NamebarBg.jpg';

const Namebar = ({ toggleFullScreen, isFullScreen = false, name = "" }) => {
  const namebarStyle = {
    backgroundImage: `url(${backgroundImg})`, // Use the imported image
    backgroundSize: 'cover', // Adjust as needed
    backgroundRepeat: 'no-repeat', // Adjust as needed
    color: 'white',
    height: '30px'
  };

  return (
    <div style={namebarStyle} className="d-flex justify-content-between">
      <button type="button" id='fullScreenButton' className="btn btn-outline btn-sm" >Dish Home</button>
      <h5 className='pt-1 ps-5'>Live Locations</h5>
      <button type="button" id='fullScreenButton' className="btn btn-outline btn-sm" onClick={toggleFullScreen}>{isFullScreen ? 'Exit Full Screen' : 'Full Screen'}</button>
    </div>
  );
};

export default Namebar;