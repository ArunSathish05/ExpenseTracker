import React from "react";
import Cookies from "js-cookie";
import axios from "axios";

const premium = () => {
  const token = Cookies.get("token");
  const premiumPurch = () => {
    const res = axios
      .get("http://localhost:5000/api/user/premium", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const premiumUser = res.data.user;
        const { ispremium } = premiumUser;
        console.log({ ispremium });
      });
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Buy Premium</h1>
      <p>unklock premium for more features ..!</p>

      <table
        style={{
          textAlign: "center",
          margin: "auto",
          padding: "auto",
          border: "1px solid blue",
          width: "50%",
        }}
      >
        <tr>
          <td>Account number</td>
          <td>
            <input></input>
          </td>
        </tr>
        <tr>
          <td>IFSC code</td>
          <td>
            <input></input>
          </td>
        </tr>
        <tr>
          <td>Mobile Number</td>
          <td>
            <input></input>
          </td>
        </tr>
      </table>
      
    </div>
  );
};

export default premium;
