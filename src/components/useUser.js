import { useState } from 'react';

function useUser() {
  const getUser = () => {
    const userDataString = localStorage.getItem('user');
    const userData = JSON.parse(userDataString);
    return userData
  };

  const [user, setUser] = useState(getUser());

  const saveUser = userData => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return {
    user: user,
    setUser: saveUser
  }
}

export default useUser;