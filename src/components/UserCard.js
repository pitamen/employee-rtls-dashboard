import React from 'react';
import { calculateTimeDifferenceInMinutes } from '../utils/commonUtils';

const UserCard = ({user}) => {
    const lastOnline = Math.round(calculateTimeDifferenceInMinutes(user.time));
    const status = lastOnline < 10 ? 'Online' : 'Offline';
    return (
            <div className={`card color${status}`} style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>                    
                    <h8 className="card-subtitle mb-2 text-body-secondary"><span>{lastOnline < 10 ? '🟢 ' : '🔴 '}</span>{lastOnline} min ago</h8>
                    <p className="card-text">Lattitude: {user.lat}</p>
                    <p className="card-text">Longitude: {user.lng}</p>
                </div>
            </div>
    );
}

export default UserCard;

