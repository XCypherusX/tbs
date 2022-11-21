import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./containers/LoginPage/LoginPage";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import HomePage from "./containers/HomePage/HomePage";
import MyBookings from "./containers/MyBookings/MyBookings";
import DefaultLayout from "./Layout/Layout";
import Reports from "./containers/Reports/Reports";
import RegisterPage from "./containers/RegisterPage/RegisterPage";
import UserContext from "./context/UserContext";
import { access } from "fs/promises";
import { message } from "antd";


function App() {
  // const [isLogged, setIsLoggedIn] = useState(false);
  // const [appLoading, setAppLoading] = useState(true);
  // const [user, setUser] = useState(null);
  // const [loggedOut, setLoggedOut] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  // const [user, setUser] = useState(null);


  // if (!isLogged) {
  //   return <LoginPage  />;
  // }
  //   if(!isLogged){
  //   return(<RegisterPage/>)
  // }
  // useEffect(() => {
  const tbs_token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // if (tbs_token) {
    
  //   axios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_API_URL}/user`,
  //     data: {tbs_token},
  //     headers: {
  //       "x-access-token":tbs_token,
  //     },

  //   })
    
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // } else ( message.error("Please login to continue") )
  // }, [user]);

  //if tbs_token not there direct to login page
   if (!tbs_token) {
     return <LoginPage />;
   }


  if (!tbs_token) {
    return (
      <Routes>
        <Route caseSensitive path="/login" element={<LoginPage />} />
        <Route caseSensitive path="/register" element={<RegisterPage />} />
      </Routes>
    )
  }
  if (tbs_token && role === "admin") {
    return (
      <>
        <DefaultLayout>
          <Routes>
            <Route caseSensitive path="/" element={<HomePage />} />
            <Route caseSensitive path="/reports" element={<Reports />} />
          </Routes>
        </DefaultLayout>
      </>
    );
  }

  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route caseSensitive path="/" element={<HomePage />} />
          <Route caseSensitive path="/mybookings" element={<MyBookings />} />
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
