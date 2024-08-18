import React, { useEffect, useState } from 'react';
import Namebar from './Namebar';
import Sidedetails from './Sidedetails';
import MapComponent from './Map';
import { BASE_URL, BASE_URL_V2, VENDOR_NAMES } from '../utils/constants';
// import edrIcon from '../img/tech-edr.png';
// import cdrIcon from '../img/tech-cdr.png';
// import mwdrIcon from '../img/tech-mwdr.png';
// import pokIcon from '../img/tech-pok.png';
// import fwdrIcon from '../img/tech-fwdr.png';
// import wdrIcon from '../img/tech-wdr.png';

//new icon
import edrIcon from '../img/tech-edr-new.png';
import cdrIcon from '../img/tech-cdr-new.png';
import mwdrIcon from '../img/tech-mwdr-new.png';
import pokIcon from '../img/tech-pok-new.png';
import fwdrIcon from '../img/tech-fwdr-new.png';
import wdrIcon from '../img/tech-wdr-new.png';
import defaultIcon from '../img/tech-default-new.png'

import { defaultAppValues, toggleFullScreen } from '../utils/commonUtils'
import { type } from 'jquery';

const Home = (props) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [orgResponse, setOrgResponse] = useState();
  const [isFetchingEmployeeCount, setIsFetchingEmployeeCount] = useState(false);
  const [totalEmployeeCount, setTotalEmployeeCount] = useState(0);
  const [filteredType, setFilteredType] = useState('ALL');

  const getAllEmployees = async (jsonResponse) => {
    const allEmployees = [];
    jsonResponse.forEach(vendor => {
      const { employees } = vendor;
      const updatedEmployees = employees.map(item => ({
        ...item,
        vendor_name: vendor.vendor_name,
        isRO: vendor.isRO
      }));
      allEmployees.push(...updatedEmployees);
    });
    return allEmployees;
  }

  const getEmployeeCount = async () => {
    setIsFetchingEmployeeCount(true);
    try {
      props.setProgress(10);
      const response = await fetch(BASE_URL_V2 + "employees/get-employee-count", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      const countResponse = await response.json();
      setTotalEmployeeCount(countResponse.data?.count);
    } catch (error) {
      console.error('Error fetching employee count:', error);
    } finally {
      setIsFetchingEmployeeCount(false);
    }
  };

  const vendorToIconMap = {
    'POK': pokIcon,
    'EDR': edrIcon,
    'WDR-Butwal': wdrIcon,
    'CDR': cdrIcon,
    'FWDR': fwdrIcon,
    'MWDR': mwdrIcon,
    'Bagmati': defaultIcon,
    'Bagmati Central': defaultIcon,
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
      const orgResponse = await response.json();
      setOrgResponse(orgResponse);
      const json = await getAllEmployees(orgResponse);
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
      filterDataAccordingToEmpType(filteredType, userData);
      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching user data:', error);
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
  }, []);

  useEffect(() => {
    filterDataAccordingToEmpType(filteredType);
  }, [filteredType, users]);

  const [receivedData, setReceivedData] = useState();

  const logDataFromSidedetails = (data) => {
    setReceivedData(data);
  };

  const filterUserAccordingToCategory = (type) => {
    setFilteredType(type)
    filterDataAccordingToEmpType(type, users)
  }

  useEffect(() => {
    console.log('')
  }, [filteredUsers])

  const filterDataAccordingToEmpType = (type, data = users) => {
    let filtered;
    if (type === "ALL") {
      filtered = data;
    } else {
      filtered = data.filter(user => user.empType === type);
    }
    setFilteredUsers(filtered);
  }

  return (
    <>
      <Namebar toggleFullScreen={toggleFullScreen} dashboardName={'DH Field View Dashboard (v0.8.0)'} />
      <Sidedetails orgResponse={orgResponse} users={users} logData={logDataFromSidedetails} employeeCount={totalEmployeeCount} isFetchingEmployeeCount={isFetchingEmployeeCount} filterData={filterUserAccordingToCategory} />
      <MapComponent users={filteredUsers} receivedData={receivedData} />
    </>
  );
};

export default Home;
