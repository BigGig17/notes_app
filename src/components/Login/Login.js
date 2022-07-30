import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login.scss';
import configData from '../../configData.json'

async function loginUser(credentials) {
 return fetch(`${configData.API_URL}/users/sign_in`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then((response) => {
    return {response: response.json(), status: response.status, token: response.headers.get('Authorization').split(' ')[1]}
  })
}

function Login({ setToken, setUser }) {
  const [user, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const loginData = await loginUser({
      user: {
        email: user,
        password: password
      }
    });
    loginData.response.then(respnseData => respnseData.user).then(usr => setUser(usr));
    setToken(loginData.token);
    
  }

  return(
    <div className="login-wrapper text-white m-2">
      <h1>Please Log In to Notes</h1>
      <form onSubmit={handleSubmit}>
        <label className='m-2'>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button className='btn btn-small btn-primary mt-2' type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login;