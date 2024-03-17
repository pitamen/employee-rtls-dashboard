import React from 'react';
import { calculateTimeDifferenceInMinutes } from '../utils/commonUtils';

const UserCard = ({user}) => {
    console.log(user)
    console.log(calculateTimeDifferenceInMinutes)
    return (
        <div>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Online {Math.round(calculateTimeDifferenceInMinutes(user.time))} min ago</h6>
                    <p className="card-text">Lattitude: {user.lat}</p>
                    <p className="card-text">Longitude: {user.lng}</p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
