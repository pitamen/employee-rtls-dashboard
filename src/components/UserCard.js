import React from 'react';
import { calculateTimeDifference } from '../utils/commonUtils';
import profilePic from '../img/profile.jpeg'

const UserCard = ({ user }) => {
    const lastOnline = (calculateTimeDifference(user.time));
    const status = lastOnline === "Just Now" ? 'Online' : 'Offline';
    return (
        <div className='card'  style={{ width: '18rem' }}>
            <div className="card-body">
                <div className="user-info">
                    <div className="user-details">
                        <h5 className="card-title">{user.name}</h5>
                        <h8 className="card-subtitle mb-2 text-body-secondary">
                            <span>{lastOnline === "Just Now" ? 'online' : `${lastOnline}`}</span>
                        </h8>
                        <p className="card-text"><b>Location:</b> {user.lat}, {user.lng}</p>
                        <p><b>Vendor Name:</b> {user.vendorName}</p>
                        <a href={`/${user.id}`} style={{ textDecoration: 'none' }} className="card-link">Show History</a>
                    </div>
                    <div className={`user-avatar${status}`} >
                        <img src={profilePic} alt="User Avatar" className='avatar-image' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
