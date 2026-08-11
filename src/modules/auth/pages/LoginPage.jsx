import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async (data) => {
    const result = await dispatch(loginUser(data));

    if (result?.payload?.token) {
      navigate("/feed");
    }
  };

  useEffect(() => {
    if (user?.id) {
      navigate("/feed");
    }
  }, [user]);

  return (
    <div className="auth-container">
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default LoginPage;