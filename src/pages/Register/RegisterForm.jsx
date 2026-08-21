import { useState } from "react";
import { useRegister } from "./register.hook";
import { registerSchema } from "./register.validator";
import { useNavigate } from "react-router-dom";
import plans from "@/config/plans.config";
import { toast } from "react-hot-toast";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, loading } = useRegister();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    province: "",
    city: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
    role: "member",
    plan: "FREE_MEMBER",
    referralCode: "",
    acceptTerms: false,
    acceptPrivacy: false,
    marketingConsent: false
  });

  const selectedPlan = plans[form.plan];

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

    const parsed = registerSchema.safeParse(form);

    if (!parsed.success) {
      setError(parsed.error.issues?.[0]?.message || "Validation failed");
      return;
    }

   try {
    const response = await register(form);

    toast.success(response.message);

    setForm({
        firstName: "",
        lastName: "",
        displayName: "",
        username: "",
        email: "",
        phone: "",
        country: "",
        province: "",
        city: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        confirmPassword: "",
        role: "member",
       referralCode: "",
        acceptTerms: false,
        acceptPrivacy: false,
        marketingConsent: false
    });

   if (response.paymentRequired) {
        navigate("/payment");
    } else {
        navigate("/verify-email", {
            state: {
                email: form.email
            }
        });
    }

} catch (err) {

    setError(
        err.response?.data?.message ||
        "Registration failed"
    );

}
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">

      <h2>Create Your Account</h2>

      <input
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
      />

      <input
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
      />

      <input
        name="displayName"
        placeholder="Display Name"
        value={form.displayName}
        onChange={handleChange}
      />

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
      />

      <input
        name="province"
        placeholder="Province / State"
        value={form.province}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
      />

      <input
        type="date"
        name="dateOfBirth"
        value={form.dateOfBirth}
        onChange={handleChange}
      />

      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="prefer_not_to_say">Prefer not to say</option>
      </select>

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option value="member">Member</option>
        <option value="creator">Creator</option>
        <option value="business">Business</option>
      </select>

      <select
  name="plan"
  value={form.plan}
  onChange={handleChange}
>
  {/* MEMBER */}
  <optgroup label="Member">
    <option value="FREE_MEMBER">Free Member</option>
    <option value="MEMBER_BASIC">Member Basic - R49/month</option>
    <option value="MEMBER_PLUS">Member Plus - R99/month</option>
  </optgroup>

  {/* CREATOR */}
  <optgroup label="Creator">
    <option value="FREE_CREATOR">Free Creator</option>
    <option value="CREATOR_BASIC">Creator Basic - R99/month</option>
    <option value="CREATOR_PLUS">Creator Plus - R199/month</option>
    <option value="CREATOR_PRO">Creator Pro - R399/month</option>
  </optgroup>

  {/* BUSINESS */}
  <optgroup label="Business">
    <option value="FREE_BUSINESS">Free Business</option>
    <option value="BUSINESS_BASIC">Business Basic - R199/month</option>
    <option value="BUSINESS_PRO">Business Pro - R499/month</option>
    <option value="BUSINESS_ENTERPRISE">
      Business Enterprise - R999/month
    </option>
  </optgroup>
</select>

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <input
    name="referralCode"
    placeholder="Referral Code (optional)"
    value={form.referralCode}
    onChange={handleChange}
/>

<p style={{
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "-5px"
}}>
    Have a BLYNK referral number? Enter it here.
</p>

      <label>
        <input
          type="checkbox"
          name="acceptTerms"
          checked={form.acceptTerms}
          onChange={handleChange}
        />
        I agree to the Terms of Service
      </label>

      <label>
        <input
          type="checkbox"
          name="acceptPrivacy"
          checked={form.acceptPrivacy}
          onChange={handleChange}
        />
        I agree to the Privacy Policy
      </label>

      <label>
        <input
          type="checkbox"
          name="marketingConsent"
          checked={form.marketingConsent}
          onChange={handleChange}
        />
        Send me marketing emails and product updates
      </label>

      {error && (
        <div
          style={{
            color: "#dc2626",
            marginTop: "10px"
          }}
        >
          {error}
        </div>
      )}

      {referralNumber && (
  <div
    style={{
      marginTop: "20px",
      padding: "20px",
      background: "#f3e8ff",
      border: "1px solid #8b5cf6",
      borderRadius: "12px",
      textAlign: "center"
    }}
  >
    <div
      style={{
        fontSize: "13px",
        fontWeight: "600",
        color: "#6b21a8",
        marginBottom: "8px"
      }}
    >
      YOUR BLYNK REFERRAL NUMBER
    </div>

    <div
      style={{
        fontSize: "24px",
        fontWeight: "800",
        color: "#5b21b6",
        letterSpacing: "1px"
      }}
    >
      {referralNumber}
    </div>

    <p style={{ marginTop: "10px" }}>
      Share this number with friends. When they register using your
      referral number, you both receive your referral rewards.
    </p>
  </div>
)}

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
        {loading ? "Creating Account..." : "Create Account"}
      </button>

    </form>
  );
}