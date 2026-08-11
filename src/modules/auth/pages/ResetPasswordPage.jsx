import { useDispatch, useSelector } from "react-redux";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { resetPassword } from "../store/authSlice";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const token = params.get("token");

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (data) => {
    dispatch(
      resetPassword({
        token,
        password: data.password
      })
    );
  };

  return (
    <div className="auth-container">
      <ResetPasswordForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ResetPasswordPage;