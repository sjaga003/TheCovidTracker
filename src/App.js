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
        <section className="footer"></section>
      </main>
    </div>
  );
}

export default App;
