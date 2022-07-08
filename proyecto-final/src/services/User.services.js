import axios from 'axios';

const BASE_URL = 'https://posts-pw2021.herokuapp.com/api/v1';

const services = {};

services.login = async (username, password) => {
  let response = {};
  try {
    response = await axios({
      method: 'POST',
      baseURL: BASE_URL,
      url: `/auth/signin`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: username,
        password: password,
      },
    });

    if (response.statusText === 'OK') {
      response = response.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log(response.data);
    return response;
  }
};

services.verifyToken = async (token) => {
  let response = {};
  try {
    response = await axios({
      method: 'GET',
      baseURL: BASE_URL,
      url: `/auth/whoami`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusText === 'OK') {
      response = response.data;
    }
  } catch (error) {
    console.error(error);
  } finally {
    return response;
  }
};

export default services;
