import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"
  import {toast}  from "react-toastify";
import {useFormik} from 'formik'
import { LoginSchema } from "./schema/LoginSchema";

function Login() {
  const navigate = useNavigate();
  const { UserData, setUserData } = useContext(UserContext);

  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });
  
const initialValues = {email:"",password:""}
const formik = useFormik({
  initialValues:initialValues,
  validationSchema:LoginSchema,
  onSubmit:async(values)=>{
  //  console.log("values",values)
  try {
      const url = isSignup
        ? "http://localhost:5000/api/user/create"
        : "http://localhost:5000/api/user/login";

      const res = await axios.post(url, values);

      if (isSignup) {
        alert("Signup successful! You can now log in.");
        setIsSignup(false);
      } else {
        if (res.data.success) {
          let token = jwtDecode(res.data?.token);
          // console.log("User res", token);
          setUserData(token);
          Cookies.set("userId",res.data.userData.Id);
          
          Cookies.set("token", res.data.token);

          toast.success("Login successful!");
           
         
          navigate("/home");
        } else {
          toast.error("Invalid credentials.");
        }
      }
    } catch (err) {
      console.error(`${isSignup ? "Signup" : "Login"} failed: `, err.message);
      toast.error("Something went wrong.");
    }

  
  }
})

  const [isSignup, setIsSignup] = useState(false);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // if (!form.email || !form.password) {
  //   //   toast.warning("Please fill in all fields.");
  //   //   return;
  //   // }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(form.email)) {
  //     toast.warning("Please enter a valid email address.");
  //     return;
  //   }

  //   try {
  //     const url = isSignup
  //       ? "http://localhost:5000/api/user/create"
  //       : "http://localhost:5000/api/user/login";

  //     const res = await axios.post(url, form);

  //     if (isSignup) {
  //       alert("Signup successful! You can now log in.");
  //       setIsSignup(false);
  //     } else {
  //       if (res.data.success) {
  //         let token = jwtDecode(res.data?.token);
  //         console.log("User res", token);
  //         setUserData(token);
  //         Cookies.set("userId",res.data.userData.Id);
          
  //         Cookies.set("token", res.data.token);

  //         toast.success("Login successful!");
           
         
  //         navigate("/home");
  //       } else {
  //         toast.error("Invalid credentials.");
  //       }
  //     }
  //   } catch (err) {
  //     console.error(`${isSignup ? "Signup" : "Login"} failed: `, err.message);
  //     toast.error("Something went wrong.");
  //   }
  // };

  return (
    <div style={styles.container}>
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>{isSignup ? "Sign Up" : "Login"}</h2>

        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Email"
          style={styles.input}
        />
        {formik.touched.email && formik.errors.email && (
          <p>{formik.errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Password"
          style={styles.input}
        />
        {formik.touched.password && formik.errors.password && (
          <p>{formik.errors.password}</p>
        )}

        <button type="submit" style={styles.button}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            style={{ color: "#007bff", cursor: "pointer" }}
          >
            {isSignup ? "Login here" : "Sign up here"}
          </span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#333",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Login;
