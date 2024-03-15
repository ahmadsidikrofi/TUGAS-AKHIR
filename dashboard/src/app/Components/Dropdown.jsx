import React from 'react';

const Dropdown = ({ patient }) => {
  return (
    <div>
      <ul>
        <li>{patient.heartrate.heart_beats}</li>
      </ul>
    </div>
  );
};
export default Dropdown;
