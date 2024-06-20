import React from 'react';
import { calculateTimeDifference, calculateTimeDifferenceInMinutes } from '../utils/commonUtils';
import profilePic from '../img/profile.jpeg'

const UserCard = ({ user }) => {
    const lastOnline = (calculateTimeDifference(user.time));
    const lastOnlineInMinute = (calculateTimeDifferenceInMinutes(user.time))
    const status = lastOnlineInMinute <= 10 ? 'Online' : 'Offline';
    return (
        <div className='card' style={{ width: '18rem' }}>
            <div className="card-body">
                <div className="user-info">
                    <div className="user-details">
                        <h5 className="card-title">{user.name}</h5>
                        <b className="card-subtitle mb-2 text-body-secondary">
                            <span>{lastOnlineInMinute  <= 10 ? 'online' : `${lastOnline}`}</span>
                        </b>
                        <p className="card-text"><b>Location:</b> {user.lat}, {user.lng}</p>
                        <p><b>Region Name:</b> {user.vendorName}</p>
                        <a href={`/user/${user.id}`} style={{ textDecoration: 'none' }} className="card-link" target='blank'>Click to Show Details.</a>
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
