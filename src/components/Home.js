import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Namebar from './Namebar';
import Sidedetails from './Sidedetails';
import MapComponent from './Map'; // Import the MapComponent

// Import custom marker icons
import userIcon from '../img/live-person-location-off.png';
import liveLocationIcon from '../img/live-person-location.png';
import { calculateTimeDifferenceInMinutes } from '../utils/commonUtils';
import { BASE_URL } from '../utils/constants';

const Home = (props) => {
  const [users, setUsers] = useState([]);
  const [orgResponse, setOrgResponse] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const getAllEmployees = async (jsonResponse) => {
    const allEmployees = [];

    jsonResponse.forEach(vendor => {

      const { employees } = vendor;
      allEmployees.push(...employees);

    });
    return allEmployees;
  }

  const fetchData = async () => {
    props.setProgress(10);
    const response = await fetch(BASE_URL + "locations/live-location-traces", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let orgResponse = await response.json();
    setOrgResponse(orgResponse);

    let json = await getAllEmployees(orgResponse);

    const userData = json.map((item) => ({
      id: item.employeeId,
      name: item.name,
      lat: item.location.latitude,
      lng: item.location.longitude,
      time: item.location.tracked_at,
      icon: calculateTimeDifferenceInMinutes(item.location.tracked_at) > 10 ? userIcon : liveLocationIcon,
      vendorName: item.vendor_name
    }));

    setUsers(userData);
    props.setProgress(100);
  }


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [users]);

  // Function to toggle full-screen mode
  const toggleFullScreen = () => {
    var elem = document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      setIsFullScreen(true); // Update state when entering full-screen mode
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullScreen(false); // Update state when exiting full-screen mode
    }
  };

  return (
    <div className="App">
      {!isFullScreen && (
        <>
          <Navbar users={users} />
          <Namebar toggleFullScreen={toggleFullScreen}/>
          <div className="d-flex">
            <div className="col-3 px-2">
              <div className="d-flex flex-column bd-highlight mb-3">
                <div className="p-2 bd-highlight border">
                  <Sidedetails orgResponse={orgResponse}  users={users}/>
                </div>
              </div>
            </div>
            <div className="col-9">
              <MapComponent users={users} />
            </div>
          </div>
        </>
      )}
      {isFullScreen && <><Namebar toggleFullScreen={toggleFullScreen}/><MapComponent users={users} /></>} {/* Render MapComponent only when in full-screen mode */}
    </div>
  );
};

export default Home;