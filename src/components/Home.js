import React, { useEffect, useState } from 'react';
import Namebar from './Namebar';
import Sidedetails from './Sidedetails';
import MapComponent from './Map';
import { BASE_URL, VENDOR_NAMES } from '../utils/constants';
import edrIcon from '../img/tech-edr.png';
import cdrIcon from '../img/tech-cdr.png';
import mwdrIcon from '../img/tech-mwdr.png';
import pokIcon from '../img/tech-pok.png';
import fwdrIcon from '../img/tech-fwdr.png';
import wdrIcon from '../img/tech-wdr.png';
import { defaultAppValues, toggleFullScreen } from '../utils/commonUtils'

const Home = (props) => {
  const [users, setUsers] = useState([]);
  const [orgResponse, setOrgResponse] = useState();

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
    'Bagmati Central': edrIcon,
  }


  const fetchUserData = async () => {
    try {
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
        icon: VENDOR_NAMES.includes(item.vendor_name) ? vendorToIconMap[item.vendor_name] : defaultAppValues.defaultIcon,
        vendorName: item.vendor_name
      }));

      setUsers(userData);
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, perhaps set some state to indicate the error to the user
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUserData();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [users]);

  const [receivedData, setReceivedData] = useState();

  const logDataFromSidedetails = (data) => {
    setReceivedData(data);
  };

  return (
    <div className="App">
      <Namebar toggleFullScreen={toggleFullScreen}  />
      <Sidedetails orgResponse={orgResponse} users={users} logData={logDataFromSidedetails} />
      <MapComponent users={users} receivedData={receivedData} />
    </div>
  );
};

export default Home;