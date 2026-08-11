import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCurrentUser } from "../modules/auth/store/authActions";
import Router from "./router";
import "../styles/index.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);

  return <Router />;
}

export default App;