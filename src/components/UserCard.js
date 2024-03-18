import React from 'react';
import { calculateTimeDifferenceInMinutes } from '../utils/commonUtils';
import profilePic from '../img/profile.jpeg'

const UserCard = ({ user }) => {
    const lastOnline = Math.round(calculateTimeDifferenceInMinutes(user.time));
    const status = lastOnline < 10 ? 'Online' : 'Offline';
    return (
        <div className='card'  style={{ width: '18rem' }}>
            <div className="card-body">
                <div className="user-info">
                    <div className={`user-avatar${status}`} >
                        <img src={profilePic} alt="User Avatar" className='avatar-image' />
                    </div>
                    <div className="user-details">
                        <h5 className="card-title">{user.name}</h5>
                        <h8 className="card-subtitle mb-2 text-body-secondary">
                            <span>{lastOnline < 10 ? '🟢 online' : `🔴 ${lastOnline} min ago`}</span>
                        </h8>
                        <p className="card-text">Latitude: {user.lat}</p>
                        <p className="card-text">Longitude: {user.lng}</p>
                        <a href="#" className="card-link">History</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
