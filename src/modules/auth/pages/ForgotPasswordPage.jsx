import { useDispatch, useSelector } from "react-redux";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { forgotPassword } from "../store/authSlice";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (data) => {
    dispatch(forgotPassword(data));
  };

  return (
    <div className="auth-container">
      <ForgotPasswordForm
        onSubmit={handleSubmit}
        loading={loading}
        message={message}
        error={error}
      />
    </div>
  );
};

export default ForgotPasswordPage;