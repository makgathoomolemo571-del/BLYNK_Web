import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const ResetPasswordForm = ({ token }) => {

  const { resetPassword, loading } = useAuth();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword({ token, password });
  };

  return (
    <div className="auth-form">

      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </form>

    </div>
  );
};

export default ResetPasswordForm;