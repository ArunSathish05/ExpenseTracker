import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import Modal from "./Modal";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { UserData, setUserData } = useContext(UserContext);
  const { email } = UserData;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    setUserData({});
    navigate("/");
    toast.info("Logged out!")
  };

  const token = Cookies.get("token");
const buypremium = () => {
  axios
    .post(
      "http://localhost:5000/api/user/premium",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((res) => {
      console.log("Premium Response:", res.data);
      toast.success("Premium purchased successfully!");

    
      setUserData((prev) => ({
        ...prev,
        ispremium: true,
      }));
    })
    .catch((err) => {
      console.error("API Error:", err.response?.data || err.message);
      toast.error("Premium purchase failed!");
    });

  setShowModal(false);
};


  return (
    <nav style={styles.navbar}>
      <div style={styles.avatar}>
        {email ? (
          email.charAt(0).toUpperCase()
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12zm0 
              2c-3 0-9 1.5-9 4.5V22h18v-3.5c0-3-6-4.5-9-4.5z"
            />
          </svg>
        )}
      </div>

      <ul style={styles.navLinks}>
        {email && !UserData?.ispremium && (
          <li>
            <button
              style={styles.premiumBtn}
              onClick={() => setShowModal(true)}
            >
              ⭐ Premium
            </button>
          </li>
        )}
        <li>
          <Link to="/home" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          {email ? (
            <span onClick={handleLogout} style={styles.link}>
              Logout
            </span>
          ) : (
            <Link to="/" style={styles.link}>
              Login
            </Link>
          )}
        </li>
        <li>
          <Link to="/premium" style={styles.link}>
            ❔
          </Link>
        </li>
      </ul>

      {/* 🔹 Portal Modal */}
      {showModal && !UserData?.ispremium && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Your Premium Membership</h2>
          <p>Unlock unlimited features 🚀</p>
          <div
            style={{
              backgroundColor: "gold",
              borderRadius: "10%",
              width: "150px",
              margin: "auto",
            }}
          >
            <h2>
              premium <br /> 2200
            </h2>

            <h4>
              $19.99 <span style={{ fontSize: "10px" }}>/mo</span>
            </h4>
            <button
              style={{
                padding: "6px 14px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "10px  ",
              }}
              onClick={buypremium}
            >
              Buy Premium
            </button>
          </div>
          <div
            style={{
              backgroundColor: "",
              width: "250px",
              margin: "auto",
              borderRadius: "10%",
              fontSize: "12px",
              padding: "5px",
              marginTop: "10px",
              textAlign: "left",
            }}
          >
            <p>Benifits of buying premium</p>
            <li>Onume kedaikadhu</li>
            <li>Venum na oru edit button thara mudium</li>
            <li>Apro oru Export CSV tharen..Enjoy🥳</li>
          </div>
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },

  avatar: {
    border: "2px solid white",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "20px",
    backgroundColor: "#555",
    color: "white",
    textTransform: "uppercase",
  },

  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s",
    cursor: "pointer",
  },
  linkHover: {
    color: "#FFD700",
  },

  premiumBtn: {
    background: "linear-gradient(90deg, #FFD700, #FFA500)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: "bold",
    color: "#333",
    textDecoration: "none",
    fontSize: "15px",
  },
};
