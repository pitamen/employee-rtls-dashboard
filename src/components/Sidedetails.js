import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeDifference } from '../utils/commonUtils';
import logo from '../img/DishHome_Logo.svg.png';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PreviewIcon from '@mui/icons-material/Preview';

const Sidedetails = ({ users, orgResponse, logData }) => {
  const navigate = useNavigate();
  const orgUsersResponse = orgResponse;
  const [mapKey, setMapKey] = useState(0)

  const handleClick = (user) => {
    setMapKey(pervValue => pervValue + 1)
    logData({ latitude: user.location.latitude, longitude: user.location.longitude, mapKey: mapKey });
  };

  const navigateToUserDetail = (user) => {
    console.log(user)
    navigate("/" + user.employeeId);
  }

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      {
        orgUsersResponse ? orgUsersResponse.map((vendor, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls='panel1-content'
              id="panel1-header"
            >
              <Typography> {vendor.vendor_name} ({vendor.employees.length})</Typography>
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
                      {user.name}<br /> ({calculateTimeDifference(user.location.tracked_at)})
                    </Link>
                    <a href={`/${user.employeeId}`} style={{ textDecoration: 'none' }} className="card-link">
                      <span><PreviewIcon style={{color: '#CC5500'}} /></span>
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        )) : null
      }
    </div>
  );
};

export default Sidedetails;
