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
        <section>
          <div></div>
        </section>
      </main>
    </div>
  );
}

export default App;
