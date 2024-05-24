import React from 'react';


const Namebar = ({ toggleFullScreen, isFullScreen = false, name = "" , userId}) => {

  return (
    <div  className="d-flex justify-content-between " id='namebarStyle'>
      <button class="btn btn-outline btn-sm" id='fullScreenButton' data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">Vendor-Technician</button>
      <h5 className='pt-1 ps-5'>Live Locations</h5>
      <button type="button" id='fullScreenButton' className="btn btn-outline btn-sm" onClick={toggleFullScreen}>{isFullScreen ? 'Exit Full Screen' : 'Full Screen'}</button>
    </div>
  );
};

export default Namebar;