import logo from './logo.svg';
import './App.css';

function App() {
  const fetchFromApi = async () => {
    const data = await fetch('https://api.covidtracking.com/v1/us/daily.json');
    const jsonData = data.json();
    return jsonData;
  };

  console.log(fetchFromApi());

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <section className="header">
          <div className="header-data">
            <h3>United States</h3>
            <div className="header-date">
              As of November 11, 2020{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" />
              </svg>
            </div>
            <div className="header-stats">
              <div className="stats-box">
                <span className="number">30000</span>
                <span className="label">Cases</span>
              </div>
              <div className="stats-box">
                <span className="number">30000</span>
                <span className="label">Deaths</span>
              </div>
              <div className="stats-box">
                <span className="number">30000</span>
                <span className="label">Tests</span>
              </div>
            </div>
          </div>
        </section>
        <section className="body">Hello</section>
        <section className="footer"></section>
      </main>
    </div>
  );
}

export default App;
