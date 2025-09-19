import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Premium = () => {
  const [form, setForm] = useState({ from: "", to: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/send-email/email", form);
      toast.success("Email sent successfully!");
      setStatus("Email sent successfully!");
    } catch (err) {
      setStatus("Error sending email.");
      console.log(err);
      
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Fill form for enquiry</h1>
      <table style={{ textAlign: "center", margin: "auto", width: "100%" }}>
        <tbody>
          <tr>
            <td>From</td>
            <td>
              <input
                name="from"
                value={form.from}
                type="email"
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </td>
          </tr>
          <tr>
            <td>To</td>
            <td>
              <input
                name="to"
                value={form.to}
                type="email"
                onChange={handleChange}
                placeholder="Recipient email"
                required
              />
            </td>
          </tr>
          <tr>
            <td>Message</td>
            <td>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="10"
                cols="30"
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="button" value="Submit" onClick={handleSubmit} />
            </td>
          </tr>
        </tbody>
      </table>
      <p>{status}</p>
    </div>
  );
};

export default Premium;
