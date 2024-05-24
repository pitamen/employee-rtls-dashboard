import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateTimeDifference } from '../utils/commonUtils';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PreviewIcon from '@mui/icons-material/Preview';
import ColoredBlock from './partials/ColoredBlock';

import fwdrHalfIcon from '../img/tech-fwdr-half.png';
import cdrHalfIcon from '../img/tech-cdr-half.png';
import edrHalfIcon from '../img/tech-edr-half.png';
import pokHalfIcon from '../img/tech-pok-half.png';
import wdrHalfIcon from '../img/tech-wdr-half.png';
import mwdrHalfIcon from '../img/tech-mwdr-half.png';

const Sidedetails = ({ users, orgResponse, logData }) => {
  const navigate = useNavigate();
  const orgUsersResponse = orgResponse;
  const [mapKey, setMapKey] = useState(0)

  const vendorToIconMap = {
    'POK': pokHalfIcon,
    'EDR': cdrHalfIcon,
    'WDR-Butwal': wdrHalfIcon,
    'CDR': edrHalfIcon,
    'FWDR': fwdrHalfIcon,
    'MWDR': mwdrHalfIcon,
    "Bagmati Central": edrHalfIcon,
    'Bagmati': edrHalfIcon
  }

  const handleClick = (user) => {
    setMapKey(pervValue => pervValue + 1)
    logData({ latitude: user.location.latitude, longitude: user.location.longitude, mapKey: mapKey });
  };

  const VendorIcon = ({ imageUrl }) => {
    return <img src={imageUrl} alt="Vendor Icon" style={{ width: '20px', height: '20px', borderRadius: '5px' }} />;
  };

  return (
    <>
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="true" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Vendor-Technician</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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
                      <VendorIcon imageUrl={vendorToIconMap[vendor.vendor_name]} />
                      <div style={{ marginLeft: '10px' }}></div>
                      <Typography variant='subtitle2'> {vendor.vendor_name} ({vendor.employees.length})</Typography>
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
                            <Typography variant='body2' style={{ fontWeight: 'bold', color: '#581845' }}>{user.name}</Typography> <Typography variant='body2'>({calculateTimeDifference(user.location.tracked_at)})</Typography>
                          </Link>
                          <a href={`/${user.employeeId}`} style={{ textDecoration: 'none' }} className="card-link" target='blank'>
                            <span><PreviewIcon style={{ color: '#CC5500' }} /></span>
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
      </div>

    </>

  );
};

export default Sidedetails;
