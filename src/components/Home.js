import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Namebar from './Namebar';
import Sidedetails from './Sidedetails';
import MapComponent from './Map';
import { BASE_URL } from '../utils/constants';
import edrIcon from '../img/tech-edr.png';
import cdrIcon from '../img/tech-cdr.png';
import mwdrIcon from '../img/tech-mwdr.png';
import pokIcon from '../img/tech-pok.png';
import fwdrIcon from '../img/tech-fwdr.png';
import wdrIcon from '../img/tech-wdr.png';

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

  const vendorToIconMap = {
    'POK': pokIcon,
    'EDR': cdrIcon,
    'WDR-Butwal': wdrIcon,
    'CDR': edrIcon,
    'FWDR': fwdrIcon,
    'MWDR': mwdrIcon,
    'Bagmati': edrIcon,
    'Bagmati Central': edrIcon
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
      // icon: calculateTimeDifferenceInMinutes(item.location.tracked_at) > 10 ? userIcon : liveLocationIcon,
      icon: vendorToIconMap[item.vendor_name],
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

  const [receivedData, setReceivedData] = useState();

  const logDataFromSidedetails = (data) => {
    setReceivedData(data);
  };

  const bodyStyle = {
    overflow: 'hidden'
  };


  return (
    <div className="App">
      {!isFullScreen && (
        <>
          {/* <Navbar users={users} logData={logDataFromSidedetails} /> */}
          <Namebar toggleFullScreen={toggleFullScreen} />
            <Sidedetails orgResponse={orgResponse} users={users} logData={logDataFromSidedetails} />
            <MapComponent users={users} receivedData={receivedData}isFullScreen={true}/>
        </>
      )}
      {isFullScreen &&
        <>
          <Namebar toggleFullScreen={toggleFullScreen} isFullScreen={true} />
          <Sidedetails orgResponse={orgResponse} users={users} logData={logDataFromSidedetails} />
          <MapComponent users={users} receivedData={receivedData} isFullScreen={true} />
        </>}
    </div>
  );
};

export default Home;