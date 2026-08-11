import { useSelector } from "react-redux";

export default function useAuth() {

  const auth = useSelector(state => state.auth);

  return {

    user: auth.user,

    token: auth.token,

    isAuthenticated: !!auth.token,

    loading: auth.loading

  };

}