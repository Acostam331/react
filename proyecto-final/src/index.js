import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* import App from './pages/App'; */
import Login from './pages/Login/Login';
import User from './pages/User/User';
import Test from './pages/Test';
import Error from './pages/Error';
import Feed from './pages/Feed/Feed';
import RedirectUser from './pages/Redirect/RedirectUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import Private from './components/PrivateRoute/PrivateRoute';
import MyPosts from './pages/MyPosts/MyPosts';

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      {/* changing routes */}
      <Routes>
        {/* default route */}
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Conditional rendering on feed*/}
        <Route
          path="/feed"
          element={
            <Private role="">
              {' '}
              <Feed />{' '}
            </Private>
          }
        />
        <Route
          path="/user"
          element={
            <Private role="">
              {' '}
              <User />{' '}
            </Private>
          }
        />
        <Route
          path="/myposts"
          element={
            <Private role="">
              {' '}
              <MyPosts />{' '}
            </Private>
          }
        />
        {/* After login */}
        <Route path="/redirect" element={<RedirectUser />} />
        {/* test route */}
        <Route path="test" element={<Test />} />
        {/* error route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>,
  document.getElementById('root')
);
