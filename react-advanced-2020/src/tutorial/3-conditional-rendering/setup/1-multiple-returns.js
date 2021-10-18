import React, { useState, useEffect } from 'react';
const url = 'https://api.github.com/users/QuincyLarson';
// const url = 'https://api.github.com/users/QuincyLarsons'; for error
const MultipleReturns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [IsEerror, setIsError] = useState(false);
  const [user, setUser] = useState('default user');

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
          return resp.json();
        } else {
          setIsLoading(false);
          setIsError(true);

          throw new Error(resp.statusText);
        }
      })
      .then((user) => {
        const { login } = user;

        setUser(login);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  if (IsEerror) {
    return (
      <div>
        <h1>Error...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{user}</h1>
    </div>
  );
};

export default MultipleReturns;
