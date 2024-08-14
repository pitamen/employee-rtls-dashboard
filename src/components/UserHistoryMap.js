import React, { useState, useEffect } from "react";
import Namebar from "./Namebar";
import "./SCSS/UserHistory.scss";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { formatDate, utcToNpt } from "../utils/commonUtils";
import { userNameToName } from "../utils/stringUtils";
import { useNavigate, useLocation } from 'react-router-dom';
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip, GeoJSON } from "react-leaflet";
import * as turf from '@turf/turf';

const UserHistoryMap = () => {

  const { user: userId, name: userName } = useParams();
  let location = useLocation()

  const [userDetail, setUserDetail] = useState(null);
  const [isFetchingUserHistory, setIsFetchingUserHistory] = useState(false);
  const [trackedAt, setUserTrackedAt] = useState(false);
  const [travelledPoints, setTravelledPoints] = useState([]);
  const [isFetchingCurrentTicketDetail, setIsFetchingCurrentTicketDetail] = useState(false);
  const [routeData, setRouteData] = useState(null)
  const [polyLineData, setPolyLineData] = useState([])

  const [geoJson, setGeoJson] = useState(null)



  useEffect(() => {

    if (!routeData) {
      return
    }
    // // Parse and sort data by tracked_at
    // const sortedData = data.sort((a, b) => new Date(a.tracked_at.$date) - new Date(b.tracked_at.$date));

    // Create a feature collection
    const features = routeData.map(point => {
      return turf.point([point.longitude, point.latitude], {
        employeeId: point.employeeId.$oid,
        tracked_at: point.tracked_at.$date
      });
    });

    console.log(features)

    const featureCollection = turf.featureCollection(features);

    // Split lines into segments of 3 km
    const line = turf.lineString(features.map(feature => feature.geometry.coordinates));
    const distance = turf.length(line, { units: 'kilometers' });
    const segments = [];

    for (let i = 0; i < distance; i += 3) {
      const start = turf.along(line, i, { units: 'kilometers' });
      const end = turf.along(line, i + 3, { units: 'kilometers' });
      const segment = turf.lineSlice(start, end, line);
      segments.push(segment);
    }

    // Create GeoJSON object
    const geoJson = turf.featureCollection(segments);

    console.log(geoJson)

    setGeoJson(geoJson);
  }, [routeData]);



  //fetch location checkin checkout history
  useEffect(() => {
    const fetchLocationHistory = async () => {
      setIsFetchingUserHistory(true);
      try {
        const formattedDate = new Date(location.state.date).toISOString().split('T')[0];
        const response = await fetch(
          `${BASE_URL}v2/locations/history/${userId}?date=${formattedDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const jsonResponse = await response.json();
        const routeData = jsonResponse.data;
        console.log("route data", routeData)


        // const convertedData = {
        //   mode: "drive",
        //   waypoints: routeData.map(entry => ({
        //     timestamp: entry.tracked_at,
        //     location: entry.location.coordinates
        //   }))
        // };

        // console.log("converted data", convertedData)

        if (routeData) {
          setRouteData(routeData);
        }
        let data = routeData.map(item => [item.latitude, item.longitude]);
        console.log(data)
        setPolyLineData(data)
        console.log(polyLineData[0][0])
        setIsFetchingUserHistory(false);

      } catch (error) {
        setIsFetchingUserHistory(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchLocationHistory();
  }, [userId]);

  // //fetch user detail
  // useEffect(() => {
  //   const fetchUserDetail = async () => {
  //     setIsFetchingUserDetail(true);
  //     try {
  //       const response = await fetch(
  //         `${BASE_URL}v2/employees/byempid/detail?id=${userId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       const userDetailResponse = await response.json();
  //       const userData = userDetailResponse.data;
  //       console.log(userData[0])
  //       if (userData.length > 0) {
  //         setUserDetail(userData[0]);
  //         if (
  //           userData[0].inProgressTicket &&
  //           Object.keys(userData[0].inProgressTicket).length > 0 &&
  //           userData[0].inProgressTicket.ticket_id
  //         ) {
  //           fetchTicketDetail(userData[0].inProgressTicket.ticket_id);
  //         }
  //       }
  //       setIsFetchingUserDetail(false);
  //     } catch (error) {
  //       setIsFetchingUserDetail(false);
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchUserDetail();
  // }, [userId]);


  // const initialUsers = [
  //   {
  //     userid: 345589,
  //     username: "Larry",
  //     trackedtime: "the Bird",
  //     trackedlocation: "@twitter",
  //     button: "view"
  //   },
  //   {
  //     userid: 345590,
  //     username: "Moe",
  //     trackedtime: "the Manager",
  //     trackedlocation: "@office",
  //     button: "view"
  //   },
  //   {
  //     userid: 345591,
  //     username: "Curly",
  //     trackedtime: "the Comedian",
  //     trackedlocation: "@stage",
  //     button: "view"
  //   }
  // ];

  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // const onSort = (key) => {
  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSortConfig({ key, direction });

  //   const sortedUsers = [...users].sort((a, b) => {
  //     if (a[key] < b[key]) {
  //       return direction === "asc" ? -1 : 1;
  //     }
  //     if (a[key] > b[key]) {
  //       return direction === "asc" ? 1 : -1;
  //     }
  //     return 0;
  //   });

  //   setUsers(sortedUsers);
  // };

  // const getSortIcon = (key) => {
  //   if (sortConfig.key !== key) return null;
  //   return sortConfig.direction === "asc" ? "▲" : "▼";
  // };

  return (
    <div className="tableBody">
      <Namebar dashboardName="User History" />
      <div className="py-4">
        <div className="container mx-auto px-4">

          <div className="mb-6">
            {polyLineData.length > 0 ? <div>
              <div className="container py-2">
                {console.log(polyLineData)}
                <MapContainer
                  // key={`${newCenter.latitude}-${newCenter.longitude}`}
                  center={[polyLineData[0][0], polyLineData[0][1]]}
                  zoom={20}
                  style={{ height: "95vh", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Polyline positions={polyLineData} color="#3d5a91" />
                  {/* {geoJson && <GeoJSON data={geoJson} />} */}
                  {/* {routeData.map((user, index) =>
                    index === 0 ? (
                      <Marker
                        key={user.keyId}
                        position={[user.lat, user.lng]}
                        icon={customMapIcon(
                          userDetail ? userDetail.name : "",
                          userIcon1
                        )}
                      >
                        <Popup>{new Date(trackedAt).toLocaleString()}</Popup>
                      </Marker>
                    ) : (
                      <CircleMarker
                        key={user.keyId}
                        center={[user.lat, user.lng]}
                        radius={1}
                        color="red"
                        fillOpacity={1}
                      >
                        <Popup>{new Date(trackedAt).toLocaleString()}</Popup>
                      </CircleMarker>
                    )
                  )} */}
                  {polyLineData.map((data, index) =>
                    <CircleMarker
                      key={index}
                      center={[data[0], data[1]]}
                      radius={1}
                      color="red"
                      fillOpacity={1}
                    >
                      {/* <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>
                        {index}
                      </Tooltip> */}
                    </CircleMarker>

                  )}
                  {/* <FullscreenControl
                    position="topright"
                    content="<b>FS</b>"
                    title="Fullscreen"
                    titleCancel="Exit Fullscreen"
                  /> */}
                </MapContainer>
              </div>
            </div> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHistoryMap;
