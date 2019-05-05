import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import swal from "sweetalert";
import { Form, Icon, Input, Button, Checkbox, Select, InputNumber } from "antd";
import venueContext from "./venue-context";

const Option = Select.Option;

export default (props) => {
  // static contextType = venueContext;
  const [update, setUpdate] = useState(useContext(venueContext));

  console.log("Centers: ", update.centers);

  const renderCenterData = () => {
    const centers = update.centers.map((element, index) => {
      // console.log(element.name);
      return (
        <Option value={element.name} key={element.name}>
          {element.name}
        </Option>
      );
    });

    return centers;
  };

  const updateField = e => {
    setValues({
      ...update,
      [e.target.name]: e.target.value
    });
  };
  
  // useEffect(() => {
  //   props.updatedVales = update
  // }, [update])

    return (
      <div className="column new-venue">
        <h2>Edit Venue </h2>
        <label htmlFor="new-venue-name">Center</label>
        <div>
          <Select style={{ width: "80%" }} onChange={(e) => console.log(e.target)}>{renderCenterData()}</Select>
        </div>
        <label htmlFor="new-venue-std-cap">Venue name</label>
        <div>
          <Input style={{ width: "80%" }} />
        </div>
        <label htmlFor="new-venue-std-cap">Capacity</label>
        <div>
          <InputNumber
            min={1}
            max={5000}
            style={{ width: "80%", marginRight: "0.5rem" }}
          />
        </div>
      </div>
    );
}

// export const VenueEdit = Form.create({ name: "venues" })(VenueEditForm);
