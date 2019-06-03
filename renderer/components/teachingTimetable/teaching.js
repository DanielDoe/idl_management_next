import React, { useState, useEffect } from "react";
import TeachingTable from "./teachingTable";
import {
  routeCenters,
  getData,
  routeAllocations,
  routeProgrammeCenters,
  routeVenues,
} from "../_shared/axiosCalls";
import "./teaching.css";

export default () => {
  const [centers, setcenters] = useState([]);
  const [programmes, setprogrammes] = useState([]);
  const [venues, setvenues] = useState([]);
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("login")));
  const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
  const headers = {
    "x-access-token": token,
    "content-type": "application/json",
  };
  useEffect(() => {
    getData({ url: routeCenters, headers }).then(data => {
      data.centers !== undefined ? setcenters(data.centers) : setcenters([]);
      //   console.log(data);
    });

    getData({ url: routeProgrammeCenters, headers }).then(data => {
      data.programmeCenterAllocations !== undefined
        ? setprogrammes(data.programmeCenterAllocations)
        : setprogrammes([]);
    });

    getData({ url: routeVenues, headers }).then(data => {
      data.venues !== undefined ? setvenues(data.venues) : setvenues([]);
      //   console.log(data);
    });

    //   getData({ url: routeVenues, headers }).then(data => {
    //     data.centers !== undefined ? setcenters(data.centers) : setcenters([]);
    //     //   console.log(data);
    //   });

    return () => {
      console.log("Unmounted component");
    };
  }, []);

  console.log(programmes)
  return (
    <div id="teaching" className="teaching-container">
      <TeachingTable
        centers={centers}
        venues={venues}
        user={user}
        programmes={programmes}
      />
    </div>
  );
};
