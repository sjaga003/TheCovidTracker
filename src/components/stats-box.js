import React from 'react';
import NumAbbr from 'number-abbreviate';

const StatsBox = ({ label, number, inc }) => {
  let numAbbr = new NumAbbr();

  return (
    <div className="stats-box">
      <span className="number" key={number}>
        {number > 1000000 ? numAbbr.abbreviate(number, 2) : number}
      </span>
      <span className="label" key={label}>
        {label}
      </span>
      <span className="change">{inc > 0 ? `+${inc}` : `-${inc}`}</span>
    </div>
  );
};

export default StatsBox;
