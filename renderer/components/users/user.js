import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import UserContext from "./user-context";
import { AddUser } from "./newUsers";
import UserList from "./userList";
// import { getData, manageUsers } from "../_shared//axiosCalls";
import "./user.css";

export default () => {
  /**
   * react hooks declarations
   * the first two declaration helps track editing oe adding mode
   *
   * token and center are stored in the localstorage after login
   *  */

  const [editMode, seteditMode] = useState(false);
  const [fieldData, setfieldData] = useState([]);
  const center = JSON.parse(localStorage.getItem("login")).center;
  const token = JSON.parse(localStorage.getItem("login")).tokenObtained;
  const headers = {
    "x-access-token": token,
    "content-type": "application/json",
  };

  const routeURL = "http://10.30.3.17:5000/user";
  const [users, setUsers] = useState([]);

//   getData({ url: routeURL, headers }).then(data => {
// 	setUsers(data.users);
//   });

  const addUserElements = user => {
    // spread the sent values from new user page
    // const { full_name, email, status, phone } = user;
    // manageUsers({...user, url: routeURL, headers, type: 'post' })

    // fetch data again after adding new user
    // getData({ url: routeURL, headers })
    // 	.then(data => {
    // 		setUsers(data.users)
    // 	});
    // console.log('Adding Users', full_name, email, status, phone);
    setUsers([...users, user]);
  };

  const removeUserElements = user => {
    // const newUsers = users;
    const idx = users.indexOf(user);
    setUsers(users.splice(idx, 1));
    console.log("Removing Users", user);
  };

  const updateUserElements = user => {
    console.log("Updating Users", user);
  };

  const onValueEditted = value => {
    console.log(value);
    seteditMode(true);
    setfieldData(value);
  };

  const triggerEditmode = () => {
    seteditMode(false);
  };

  //getData({ url: routeURL, headers: headers }).users

  useEffect(() => {
    // console.log(token)
    // Try this instead
    // nothing got returned
  }, []);

  return (
    <UserContext.Provider
      value={{
        users: users,
        addUserElements: addUserElements,
        removeUserElements: removeUserElements,
        updateUserElements: updateUserElements,
      }}
    >
      <div style={{ width: "100%" }} id="user">
        <div style={{ paddingTop: "1rem", height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col span={16} style={{ height: "100%" }}>
              <UserList users={users} onValueEditted={onValueEditted} />
            </Col>
            <Col
              span={8}
              style={{
                height: "100%",
                borderLeft: "1px solid rgba(0,0,0,0.12)",
              }}
            >
              <AddUser
                editMode={editMode}
                onCancel={triggerEditmode}
                fieldData={fieldData}
                // onListUpload={openFileDialog}
                onValueEditted={onValueEditted}
              />
            </Col>
          </Row>
        </div>
      </div>
    </UserContext.Provider>
  );
};
