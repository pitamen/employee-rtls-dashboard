import React, { useState, useEffect } from "react";
import Namebar from "./Namebar";
import "./SCSS/UserHistory.scss";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { formatDate, utcToNpt } from "../utils/commonUtils";
import { userNameToName } from "../utils/stringUtils";
import { useNavigate } from 'react-router-dom';

const UserHistory = () => {

  const navigate = useNavigate();

  const { user: userId, name: userName } = useParams();

  const [userDetail, setUserDetail] = useState(null);
  const [isFetchingUserDetail, setIsFetchingUserDetail] = useState(false);
  const [isFetchingUserAttendance, setIsFetchingUserAttendance] = useState(false);
  const [fetchIntervalId, setFetchIntervalId] = useState(null);
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [trackedAt, setUserTrackedAt] = useState(false);
  const [travelledPoints, setTravelledPoints] = useState([]);
  const [currentTicketDetail, setCurrentTicketDetail] = useState(null);
  const [isFetchingCurrentTicketDetail, setIsFetchingCurrentTicketDetail] = useState(false);
  const [attendanceData, setAttendanceData] = useState([])

  const handleButtonClick = (userId, date) => {
    navigate(`/user/history/${userId}`, { state: { date } }); // Change '/about' to the route you want to navigate to
  };

  //fetch ticket detail
  const fetchTicketDetail = async (ticketId) => {
    try {
      setIsFetchingCurrentTicketDetail(true);
      const response = await fetch(`${BASE_URL}v2/tickets/detail/${ticketId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();
      setCurrentTicketDetail(responseJson);
    } catch (error) {
      setCurrentTicketDetail(null);
      console.error("error: ", error.message);
    } finally {
      setIsFetchingCurrentTicketDetail(false);
    }
  };

  //fetch location checkin checkout history

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      setIsFetchingUserAttendance(true);
      try {
        const response = await fetch(
          `${BASE_URL}v2/attendance/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const attendanceResponse = await response.json();
        const attendanceData = attendanceResponse.data;
        console.log(attendanceData)

        if (attendanceData) {
          setAttendanceData(attendanceData);
        }
        setIsFetchingUserDetail(false);
      } catch (error) {
        setIsFetchingUserAttendance(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchAttendanceHistory();
  }, [userId]);

  //fetch user detail
  useEffect(() => {
    const fetchUserDetail = async () => {
      setIsFetchingUserDetail(true);
      try {
        const response = await fetch(
          `${BASE_URL}v2/employees/byempid/detail?id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const userDetailResponse = await response.json();
        const userData = userDetailResponse.data;
        console.log(userData[0])
        if (userData.length > 0) {
          setUserDetail(userData[0]);
          if (
            userData[0].inProgressTicket &&
            Object.keys(userData[0].inProgressTicket).length > 0 &&
            userData[0].inProgressTicket.ticket_id
          ) {
            fetchTicketDetail(userData[0].inProgressTicket.ticket_id);
          }
        }
        setIsFetchingUserDetail(false);
      } catch (error) {
        setIsFetchingUserDetail(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDetail();
  }, [userId]);


  const initialUsers = [
    {
      userid: 345589,
      username: "Larry",
      trackedtime: "the Bird",
      trackedlocation: "@twitter",
      button: "view"
    },
    {
      userid: 345590,
      username: "Moe",
      trackedtime: "the Manager",
      trackedlocation: "@office",
      button: "view"
    },
    {
      userid: 345591,
      username: "Curly",
      trackedtime: "the Comedian",
      trackedlocation: "@stage",
      button: "view"
    }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <div className="tableBody">
      <Namebar dashboardName="User History" />
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="personal-details mt-2">
            <h2>User Details</h2>
            <p><strong>username: </strong>{userDetail ? userNameToName(userDetail.name) : ''}</p>
            {/* <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p> */}
          </div>
          <div className="container py-1 my-1">
            <div className="mb-6 py-2">
              <div className="date-filter mt-2">
                <h3 className="text-center">Filter Location History by Date</h3>
                <div
                  className="d-flex justify-content-center"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div className="mb-2" style={{ marginRight: 8 }}>
                    <label htmlFor="startDate" className="sr-only">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      placeholder="Start Date"
                    />
                  </div>
                  <div className="mb-2" style={{ marginRight: 8 }}>
                    <label htmlFor="endDate" className="sr-only">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      placeholder="End Date"
                    />
                  </div>
                  <button type="submit" className="btn btn-danger mb-2">
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div>
              <div className="container py-2">
                <table className="table table-striped">
                  <thead>
                    <tr className="table-danger">
                      <th scope="col" onClick={() => onSort("userid")}>
                        <b>Date {getSortIcon("userid")}</b>
                      </th>
                      <th scope="col" onClick={() => onSort("username")}>
                        <b>Checked In Time {getSortIcon("username")}</b>
                      </th>
                      <th scope="col" onClick={() => onSort("trackedtime")}>
                        <b>Checked Out Time{getSortIcon("trackedtime")}</b>
                      </th>
                      <th scope="col" onClick={() => onSort("trackedlocation")}>
                        <b>Checked In Location {getSortIcon("trackedlocation")}</b>
                      </th>
                      <th scope="col" onClick={() => onSort("trackedlocation")}>
                        <b>Checked Out Location {getSortIcon("trackedlocation")}</b>
                      </th>
                      <th scope="col">
                        <b>Action</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((attendance) => (
                      <tr key={attendance._id}>
                        <th scope="row">{formatDate(attendance.date)}</th>
                        <td>{utcToNpt(attendance.timeIn)}</td>
                        <td>{attendance.timeOut ? utcToNpt(attendance.timeOut) : 'N/A'}</td>
                        <td>{attendance.latitude ? `${attendance.latitude}, ${attendance.longitude}` : ''}</td>
                        <td>{attendance.olatitude ? `${attendance.olatitude}, ${attendance.olongitude}` : ''}</td>
                        <td><button className="btn btn-danger mb-2" onClick={() => handleButtonClick(userId, attendance.date)}>View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
