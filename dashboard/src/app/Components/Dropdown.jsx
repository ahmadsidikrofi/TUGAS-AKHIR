import React from 'react';

const Dropdown = ({ patient }) => {
  return (
    <div>
      <ul>
        <li>HR: {patient.heartrate.heart_beats} bpm</li>
        <li>SpO2: {patient.oxygen_saturation.blood_oxygen}</li>
        <li>NIBP: {patient.nibp.systolic}</li>
      </ul>
    </div>
  );
};
export default Dropdown;
