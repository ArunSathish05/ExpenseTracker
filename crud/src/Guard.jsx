import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "./UserContext";
import axios from "axios";

const Guard = ({ children }) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const { UserData, setUserData } = useContext(UserContext);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/user/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserData(res.data.user);
          setIsUser(true);
          setIsCheck(true);
        })
        .catch(() => {
          setIsUser(false);
          setIsCheck(true);
        });
    } else {
      setIsUser(false);
      setIsCheck(true);
    }
  }, []);

  useEffect(() => {
    if (isCheck && !isUser) {
      navigate("/");
    }
  }, [isCheck, isUser, navigate]);

  if (!isCheck) {
    return <p>Loading...!</p>;
  }

  return children;
};

export default Guard;
