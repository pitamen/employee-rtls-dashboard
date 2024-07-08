import React, { useEffect, useState } from 'react';
import Namebar from './Namebar';
import Sidedetails from './Sidedetails';
import MapComponent from './Map';
import { BASE_URL, BASE_URL_V2, VENDOR_NAMES } from '../utils/constants';
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
  const [isFetchingEmployeeCount, setIsFetchingEmployeeCount] = useState(false)
  const [totalEmployeeCount, setTotalEmployeeCount] = useState(0)

  const getAllEmployees = async (jsonResponse) => {
    const allEmployees = [];
    jsonResponse.forEach(vendor => {
      const { employees } = vendor;
      const updateEmployees = employees.map(item => {
        return { ...item, vendor_name: vendor.vendor_name, isRO: vendor.isRO };
      });
      allEmployees.push(...updateEmployees);

    });
    return allEmployees;
  }

  const getEmployeeCount = async () => {
    setIsFetchingEmployeeCount(true)
    try {
      props.setProgress(10);
      const response = await fetch(BASE_URL_V2 + "employees/get-employee-count", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      let countResponse = await response.json();
      setTotalEmployeeCount(countResponse.data?.count)
      setIsFetchingEmployeeCount(false)
    } catch (error) {
      setIsFetchingEmployeeCount(false)
      console.error('Error fetching data:', error);
    }
  };



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
      const response = await fetch(BASE_URL_V2 + "locations/live-location-traces", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
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
        isRO: item.isRO,
        icon: VENDOR_NAMES.includes(item.vendor_name) ? vendorToIconMap[item.vendor_name] : defaultAppValues.defaultIcon,
        empType: item.empType ?? 'N/A',
        vendorName: item.vendor_name
      }));



      setUsers(userData);
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getEmployeeCount();
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
    <>
      <Namebar toggleFullScreen={toggleFullScreen} dashboardName={'DH Field View Dashboard (v0.7.0)'} />
      <Sidedetails orgResponse={orgResponse} users={users} logData={logDataFromSidedetails} employeeCount={totalEmployeeCount} isFetchingEmployeeCount={isFetchingEmployeeCount} />
      <MapComponent users={users} receivedData={receivedData} />
    </>
  );
};

export default Home;