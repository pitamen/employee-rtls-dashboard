import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeDifference, defaultAppValues } from '../utils/commonUtils';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PreviewIcon from '@mui/icons-material/Preview';
import HistoryIcon from '@mui/icons-material/History';
// import fwdrHalfIcon from '../img/tech-fwdr-half.png';
// import cdrHalfIcon from '../img/tech-cdr-half.png';
// import edrHalfIcon from '../img/tech-edr-half.png';
// import pokHalfIcon from '../img/tech-pok-half.png';
// import wdrHalfIcon from '../img/tech-wdr-half.png';
// import mwdrHalfIcon from '../img/tech-mwdr-half.png';
import fwdrHalfIcon from '../img/tech-fwdr-new-half.png';
import cdrHalfIcon from '../img/tech-cdr-new-half.png';
import edrHalfIcon from '../img/tech-edr-new-half.png';
import pokHalfIcon from '../img/tech-pok-new-half.png';
import wdrHalfIcon from '../img/tech-wdr-new-half.png';
import mwdrHalfIcon from '../img/tech-mwdr-new-half.png';
import defaultHalfIcon from '../img/tech-default-new-half.png';

import Search from './Search';
import './SCSS/SideDetails.scss'
import { VENDOR_NAMES } from '../utils/constants';
import { customMapIconVendor, lessZoomedIconVendor, sidebarIcon } from '../utils/mapUtils';

const Sidedetails = ({ users, orgResponse, logData, userId, employeeCount, isFetchingEmployeeCount, filterData }) => {
  const navigate = useNavigate();
  const orgUsersResponse = orgResponse;

  const [mapKey, setMapKey] = useState(0)
  const [offcanvasOpen, setOffcanvasOpen] = useState(true);
  const [searchResults, setSearchResults] = useState([])

  const vendorToIconMap = {
    'POK': pokHalfIcon,
    'EDR': edrHalfIcon,
    'WDR-Butwal': wdrHalfIcon,
    'CDR': cdrHalfIcon,
    'FWDR': fwdrHalfIcon,
    'MWDR': mwdrHalfIcon,
    "Bagmati Central": defaultHalfIcon,
    'Bagmati': defaultHalfIcon
  }

  const countTotalLiveUsers = (data) => {
    let liveCount = 0;
    data.forEach(vendor => {
      liveCount += vendor.employees.length
    });

    return liveCount;
  }


  const totalLiveusers = orgUsersResponse?.length > 0 ? countTotalLiveUsers(orgUsersResponse) : 0

  const handleClick = (user) => {
    setMapKey(pervValue => pervValue + 1)
    logData({ latitude: user.location.latitude, longitude: user.location.longitude, mapKey: mapKey });
  };

  const VendorIcon = ({ imageUrl }) => {
    return <img src={imageUrl} alt="Vendor Icon" style={{ width: '20px', height: '20px', borderRadius: '5px' }} />;
  };

  const handleSuccessfulSearch = (employees) => {
    console.log(employees)
    setSearchResults(employees)
  };

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/login');
  };

  const toggleOffcanvas = () => {
    setOffcanvasOpen(!offcanvasOpen); // Toggle offcanvas state
  };

  const [activeItem, setActiveItem] = useState('ALL');

  const handleItemClick = (item) => {
    setActiveItem(item)
    filterData(item)
  };

  return (
    <div>
      <div className={`offcanvas offcanvas-start ${offcanvasOpen ? 'show' : ''}`} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel"></h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleOffcanvas}></button>
        </div>
        <div className='container py-2'>
          {!userId && (
            <Search users={users} handleSuccessfulSearch={handleSuccessfulSearch} />
          )}
        </div>

        {/* {
          searchResults.length > 1 ? <div>
            <Typography variant="h6">Search Results</Typography>
            <ul className="list-group">
              {searchResults.map((user) => (
                <li key={user.id} className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link
                    to="#"
                    style={{ textDecoration: 'none' }}
                    onClick={() => handleClick(user)}
                  >
                    <Typography variant='body2' style={{ fontWeight: 'bold', color: '#581845' }}>{user.name}</Typography>
                  </Link>
                  <a href={`/user/${user.id}`} style={{ textDecoration: 'none' }} className="card-link" target='blank' title="User Details">
                    <span><PreviewIcon style={{ color: '#CC5500' }} /></span>
                  </a>
                  <a href={`/user/detail/${user.id}`} style={{ textDecoration: 'none' }} className="card-link" target='blank' title="Show History">
                    <span><HistoryIcon style={{ color: '#CC5500' }} /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div> : <></>
        } */}

        {!isFetchingEmployeeCount ? <div className="d-flex justify-content-around">
          <div className="p-2"><small>🟦Total-{employeeCount}</small></div>
          <div className="p-2"><small>🟩Online-{totalLiveusers}</small></div>
          <div className="p-2"><small>🟥Offline-{employeeCount - totalLiveusers}</small></div>
        </div> : <></>}
        <div className="container pb-2">
          <div className="row align-items-center" style={{ marginTop: '16px', padding: '8px' }}>
            <div className="col-md-6">
              <label htmlFor="dropdown" className="form-label">Technician Type:</label>
            </div>
            <div className="col-md-6">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {activeItem}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {['ALL', 'NST', 'IST/OST'].map((item) => (
                    <li key={item}>
                      <a
                        className={`dropdown-item ${activeItem === item ? 'active' : ''}`}
                        href="#"
                        onClick={() => handleItemClick(item)}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="offcanvas-body">
          <div style={{ marginTop: '20px', marginBottom: '20px', overflowY: 'auto', maxHeight: '100vh', scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'none' }} >
            {
              orgUsersResponse ? orgUsersResponse.map((vendor, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls='panel1-content'
                    id="panel1-header"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <VendorIcon imageUrl={!vendor.isRO ? sidebarIcon(vendor.vendor_name) : VENDOR_NAMES.includes(vendor.vendor_name) ? vendorToIconMap[vendor.vendor_name] : defaultAppValues.defaultHalfIcon} />
                      <div style={{ marginLeft: '10px' }}></div>
                      <Typography variant='subtitle2'> {vendor.isRO ? vendor.vendor_name : `${vendor.vendor_name} - ${vendor.roDetail.name}`} ({vendor.employees.length})</Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul className="list-group">
                      {vendor.employees && vendor.employees.map((user) => (
                        <li key={user.employeeId} className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Link
                            to="#"
                            style={{ textDecoration: 'none' }}
                            onClick={() => handleClick(user)}
                          >
                            <Typography variant='body2' style={{ fontWeight: 'bold', color: '#581845' }}>{user.name}</Typography> <Typography variant='body2'>Last Update: {calculateTimeDifference(user.location.tracked_at)} ago</Typography>
                          </Link>
                          <a href={`/user/${user.employeeId}`} style={{ textDecoration: 'none' }} className="card-link" target='blank' title="User Details">
                            <span><PreviewIcon style={{ color: '#CC5500' }} /></span>
                          </a>
                          <a href={`/user/detail/${user.employeeId}`} style={{ textDecoration: 'none' }} className="card-link" target='blank' title="Show History">
                            <span><HistoryIcon style={{ color: '#CC5500' }} /></span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              )) : null
            }
          </div>
        </div>
        <button className="btn btn-outline-danger my-2 mx-3" onClick={handleLogout} >
          Logout
        </button>
      </div>
    </div>

  );
};

export default Sidedetails;
