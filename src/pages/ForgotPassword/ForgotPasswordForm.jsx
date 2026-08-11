import { useState } from "react";
import { requestReset } from "./forgotPassword.service";

export default function ForgotPasswordForm() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await requestReset(email);

      setMessage(res.message || "Reset link sent to email");

    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      {message && <p>{message}</p>}

    </form>
  );
}