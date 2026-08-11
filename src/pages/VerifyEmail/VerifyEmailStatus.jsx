import React from "react";

export default function VerifyEmailStatus({
  status,
  loading,
  error
}) {

  if (loading) {
    return <h3>Verifying your email...</h3>;
  }

  if (error) {
    return (
      <div>
        <h3>Email verification failed</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div>
        <h2>Email verified successfully 🎉</h2>
        <p>You can now log in to your account.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Verifying...</h3>
    </div>
  );
}