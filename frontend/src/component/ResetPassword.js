import { useState } from "react";

import axios from "axios";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import apiList from "../lib/apiList";


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  // const navigate = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(token);
      
      const res = await axios.post(apiList.resetpassword, {
      token,
      newPassword,
    });
      setMessage(res.data.message);
      
      // navigate("/login", 3000);
    } catch (error) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;