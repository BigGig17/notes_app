import React, { useEffect } from 'react'
import NotePad from './components/Notes/NotePad'
import Login from './components/Login/Login';
import useToken from './components/useToken';
import useUser from './components/useUser';

function App() {
  const { token, setToken } = useToken();
  const {user, setUser} = useUser();

  useEffect(() => {
    document.body.style.backgroundColor = "#698fa5";
  },[]);
  async function logoutUser() {
    return fetch(`${process.env.REACT_APP_API_URL}/users/sign_out`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setToken('');
     })
   }

   function handleSetUser(user){
    setUser(user);
   }

  if(!token) {
    return (
      <Login setToken={setToken} setUser={handleSetUser} />
    )
  }

  return (
    <>
      <NotePad logout={logoutUser} user={user} token={token} />
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
