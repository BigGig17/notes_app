import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotePad from './components/Notes/NotePad'
import Login from './components/Login/Login';

// const API_URL = "http://localhost:3000/api/v1/notes"

function App() {

  // const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <>
      <NotePad />
      <footer>
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 custom-text-white">Home</a>
          </li>
          <li className="nav-item">
            <a href="https://github.com/BigGig17" className="nav-link px-2 custom-text-white">GitHub</a>
          </li>
          <li className="nav-item">
            <a href="https://www.planetargon.com/" className="nav-link px-2 custom-text-white">Planet Argon</a>
          </li>
        </ul>
      </footer>
    </>
  )
}

export default App;
