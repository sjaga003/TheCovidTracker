import React from 'react';
import NumAbbr from 'number-abbreviate';

const StatsBox = ({ label, number, inc }) => {
  let numberVal = Number(number);
  let numAbbr = new NumAbbr();
  const handleNumber = () => {
    if (numberVal > 300000) {
      return numAbbr.abbreviate(number, 2);
    } else {
      return number;
    }
  };
  return (
    <div className="stats-box">
      <span className="number" key={number}>
        {handleNumber()}
      </span>
      <span className="label" key={label}>
        {label}
      </span>
      <span className="change">{inc > 0 ? `+${inc}` : `-${inc}`}</span>
    </div>
  );
};

export default StatsBox;
