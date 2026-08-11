import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "./login.validator";
import { loginUser } from "./login.service";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../modules/auth/store/authSlice"; // adjust path

export default function LoginForm() {
  const navigate = useNavigate();
const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validation = loginSchema.safeParse(form);

    if (!validation.success) {
      setError(validation.error.issues?.[0]?.message || "Validation failed");
      return;
    }

    try {
      setLoading(true);

      const result = await loginUser(form);

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      if (result.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(result.user)
        );
      }

      dispatch(
  setCredentials({
    user: result.user,
    token: result.accessToken,
    refreshToken: result.refreshToken
  })
);

      navigate("/feed");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to login."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="login-form"
    >
      <h2>Welcome Back</h2>

      <p>Sign in to continue.</p>

      {error && (
        <div
          style={{
            color: "#dc2626",
            marginBottom: "15px"
          }}
        >
          {error}
        </div>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        autoComplete="email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        value={form.password}
        onChange={handleChange}
      />

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "15px"
        }}
      >
        <input
          type="checkbox"
          name="rememberMe"
          checked={form.rememberMe}
          onChange={handleChange}
        />

        Remember Me
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{
          display: "block",
          width: "100%",
          padding: "15px",
          marginTop: "20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Link to="/forgot-password">
          Forgot Password?
        </Link>

        <Link to="/register">
          Create Account
        </Link>
      </div>

    </form>
  );
}