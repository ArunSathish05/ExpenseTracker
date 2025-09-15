// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./pages/Home";
import Guard from "./Guard";
import Layout from "./pages/Layout";

import { UserContext } from "./UserContext";
import Premium from "./pages/Premium";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [UserData , setUserData] = useState({})
  return (
    <UserContext.Provider value={{ UserData, setUserData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route
              path="/home"
              element={
                <Guard>
                  <Home />
                </Guard>
              }
            />
            <Route path="/premium" element={<Premium />} />
          </Route>
         
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
