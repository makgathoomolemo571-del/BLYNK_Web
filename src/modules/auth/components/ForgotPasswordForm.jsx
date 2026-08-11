import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const ForgotPasswordForm = () => {

  const { forgotPassword, loading } = useAuth();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="auth-form">

      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </form>

    </div>
  );
};

export default ForgotPasswordForm;