
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../components/RegisterForm";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const handleRegister = async (data) => {
    try {
      const result = await dispatch(registerUser(data));

      if (registerUser.fulfilled.match(result)) {
        const response = result.payload;

        navigate("/verify-email", {
          state: {
            email: data.email,
            message: response.message,
             referralCode:
        data.referralCode ||
        data.user?.referralCode ||
        null,
      referral:
        data.referral || null
          }
        });
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <RegisterForm
      onRegister={handleRegister}
      loading={loading}
      error={error}
    />
  );
};

export default RegisterPage;
