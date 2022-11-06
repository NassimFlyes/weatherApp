import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


const api = {
  key: "e14ca7ca01cdbfd2dfaa57bec1324356",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [info, setinfo] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${info}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setinfo('');
        });
    }
  }

  return (
    <div className='all'>
      <div className={(typeof weather.main != "undefined")
        ? ((weather.main.temp > 16) ? 'app warm' : 'app')
        : 'app'}>
        <main>
          <div className="container">
            <div className='intro'>Welcome to Nassim weather App ,put the city and show the weather</div>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={e => setinfo(e.target.value)}
              value={info}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="city">
                <div className="location">{weather.name}, {weather.sys.country}</div>
              </div>
              <div className="degre">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : ('')}
        </main>
      </div>
    </div>
  );
}

export default App;