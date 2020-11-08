import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import StatsBox from './components/stats-box.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Moment from 'react-moment';
import { Line } from 'react-chartjs-2';

import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const [covidData, setCovidData] = useState({});
  const [startDate, setStartDate] = useState(() => {
    let today = new Date();
    return today.setDate(today.getDate() - 1);
  });
  const [calendarVisible, setCalendarVisible] = useState('none');
  const node = useRef();

  const fetchFromApi = async () => {
    const data = await fetch('https://api.covidtracking.com/v1/us/daily.json');
    const jsonData = await data.json();
    return jsonData;
  };

  const getData = async () => {
    fetchFromApi().then((jsonData) => {
      // console.log(jsonData);
      const dateVal = new Date(startDate);
      const dateString = `${dateVal.getFullYear()}${(
        '0' +
        (dateVal.getMonth() + 1)
      ).slice(-2)}${('0' + dateVal.getDate()).slice(-2)}`;

      let obj = {
        casesIncValues: [],
        dates: [],
      };
      jsonData.map((data) => {
        if (data.date == dateString) {
          obj.cases = data.positive;
          obj.casesInc = data.positiveIncrease;
          obj.deaths = data.death;
          obj.deathsInc = data.deathIncrease;
          obj.tests = data.totalTestResults;
          obj.testsInc = data.totalTestResultsIncrease;
        }
        if (data.positiveIncrease > 0 && data.date <= dateString) {
          obj.casesIncValues.push(data.positiveIncrease);

          let dateString = data.date.toString();
          let year = dateString.slice(0, 4);
          let month = dateString.slice(4, 6);
          let day = dateString.slice(6, 8);
          let completeDate = `${month}-${day}-${year}`;
          let momentDate = moment().format(completeDate, 'MMMM');
          obj.dates.push(momentDate);
        }
      });
      obj.casesIncValues = obj.casesIncValues
        .reverse()
        .filter((val) => val > 0);
      obj.dates = obj.dates.reverse();

      setCovidData(obj);
    });
  };

  const isValidDate = (date) => {
    let today = new Date();
    if (
      date > new Date('03/07/2020') &&
      date < today.setDate(today.getDate() - 1)
    ) {
      return date;
    }
  };

  const clickDate = () => {
    if (calendarVisible === 'none') {
      // console.log(calendarVisible);
      setCalendarVisible('block');
    } else {
      setCalendarVisible('none');
    }
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setCalendarVisible('none');
  };

  useEffect(() => {
    getData();
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    getData();
  }, [startDate]);

  const data = {
    labels: covidData.dates,
    datasets: [
      {
        label: 'Number of Cases',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: covidData.casesIncValues,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            display: true,
            autoSkip: true,
            maxTicksLimit: 5,
            source: 'data',
          },
        },
      ],
    },
  };

  // console.log(covidData.casesIncValues);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <section className="header">
          <div className="header-data">
            <h3>United States</h3>
            <div className="header-date">
              <div
                ref={node}
                className="calendar"
                style={{ display: calendarVisible }}
              >
                {' '}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    clickDate();
                  }}
                  filterDate={isValidDate}
                  inline
                />
              </div>
              As of{' '}
              <span onClick={clickDate} className="date-moment">
                <Moment date={startDate} format="MMMM Do, YYYY " />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" />
                </svg>
              </span>
            </div>
            <div className="header-stats">
              <StatsBox
                label="Cases"
                number={covidData.cases}
                inc={covidData.casesInc}
              />
              <StatsBox
                label="Deaths"
                number={covidData.deaths}
                inc={covidData.deathsInc}
              />
              <StatsBox
                label="Tests"
                number={covidData.tests}
                inc={covidData.testsInc}
              />
            </div>
          </div>
        </section>
        <section className="body">
          <div className="chart-area">
            <h1 className="chart-title">Daily Cases</h1>
            <Line data={data} options={options} />
          </div>
        </section>
        <section className="footer">
          <span className="footer-data">
            {' '}
            <svg
              viewBox="0 0 437 437"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M218.5 0L389.33 82.2675L431.522 267.121L313.304 415.362H123.696L5.47826 267.121L47.6698 82.2675L218.5 0Z"
                fill="#1A1E22"
              />
              <path
                d="M206.76 199.872C199.08 199.872 195.24 196.032 195.24 188.352V157.248C195.24 149.568 191.4 145.728 183.72 145.728H145.128C137.448 145.728 133.608 149.568 133.608 157.248V288.864C133.608 296.544 137.448 300.384 145.128 300.384H183.72C191.4 300.384 195.24 296.544 195.24 288.864V260.64C195.24 252.96 199.08 249.12 206.76 249.12H209.928C217.608 249.12 221.448 252.96 221.448 260.64V297.216C221.448 302.784 219.528 307.488 215.688 311.328L206.184 320.832C202.344 324.672 197.64 326.592 192.072 326.592H136.776C131.208 326.592 126.504 324.672 122.664 320.832L113.16 311.328C109.32 307.488 107.4 302.784 107.4 297.216V148.896C107.4 143.328 109.32 138.624 113.16 134.784L122.664 125.28C126.504 121.44 131.208 119.52 136.776 119.52H192.072C197.64 119.52 202.344 121.44 206.184 125.28L215.688 134.784C219.528 138.624 221.448 143.328 221.448 148.896V188.352C221.448 196.032 217.608 199.872 209.928 199.872H206.76ZM232.995 131.04C232.995 123.36 236.835 119.52 244.515 119.52H335.523C343.203 119.52 347.043 123.36 347.043 131.04V134.208C347.043 141.888 343.203 145.728 335.523 145.728H314.787C307.107 145.728 303.267 149.568 303.267 157.248V314.784C303.267 322.464 299.427 326.304 291.747 326.304H288.579C280.899 326.304 277.059 322.464 277.059 314.784V157.248C277.059 149.568 273.219 145.728 265.539 145.728H244.515C236.835 145.728 232.995 141.888 232.995 134.208V131.04Z"
                fill="#65CACA"
              />
            </svg>
            &nbsp;Made by Suhas Jagannath
          </span>
          <span className="footer-github">
            Check it out on{' '}
            <a href="https://github.com/sjaga003/cutiehack2020">Github</a>
          </span>
        </section>
      </main>
    </div>
  );
}

export default App;
