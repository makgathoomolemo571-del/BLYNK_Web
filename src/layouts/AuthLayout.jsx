import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-layout">

      <div className="auth-container">

        {/* LEFT SIDE (branding / illustration) */}
        <div className="auth-center">
          <p>Welcome to BLYNK</p>
          <p>Connect. Create. Earn.</p>
        </div>

        {/* RIGHT SIDE (forms) */}
        <div className="auth-right">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AuthLayout;