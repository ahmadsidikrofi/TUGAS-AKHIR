import React from 'react';

const Dropdown = ({ patient }) => {
  return (
    <div>
      <ul>
        <li>{patient.heartrate.heart_beats}</li>
        <li>{patient.oxygen_saturation.blood_oxygen}</li>
      </ul>
    </div>
  );
};
export default Dropdown;
