import { useState } from "react";
import axios from "axios";
import apiList from "../lib/apiList";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(apiList.forgotpassword, { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Error sending reset email");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Send Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;