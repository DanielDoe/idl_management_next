import React, { useState } from "react";
import { Row, Col } from "antd";
import UserContext from "./user-context";
import { AddUser } from "./newUsers";
import UserList from "./userList";
import "./user.css";

export default () => {
  const [users, setUsers] = useState([
    {
      name: "Accra",
      code: "ACC",
    },
    {
      name: "Volta",
      code: "VR",
    },
    {
      name: "Kumasi",
      code: "KMA",
    },
  ]);

  const addUserElements = user => {
    // updatedUsers = Users
    // setUsers(newUser);
    let newUser = [];
    console.log("Adding Users", newUser);
    // setUsers(Users.push(User))
  };

  const removeUserElements = user => {
    console.log("Removing Users", User);
  };

  const updateUserElements = user => {
    console.log("Updating Users", user);
  };

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
              <UserList />
            </Col>
            <Col span={8} style={{ height: "100%", borderLeft: "1px solid rgba(0,0,0,0.12)" }}>
              <AddUser />
            </Col>
          </Row>
        </div>
      </div>
    </UserContext.Provider>
  );
};
