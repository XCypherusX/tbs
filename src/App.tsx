import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./containers/LoginPage/LoginPage";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import MyBookings from "./containers/MyBookings/MyBookings";
import DefaultLayout from "./Layout/Layout";
import RegisterPage from "./containers/RegisterPage/RegisterPage";

function App() {
  const [isLogged, setIsLoggedIn] = useState(false);
  if (!isLogged) {
    return <LoginPage login={setIsLoggedIn} />;
  }
  //   if(!isLogged){
  //   return(<RegisterPage/>)
  // }

  return (
    <>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mybookings" element={<MyBookings />} />
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
