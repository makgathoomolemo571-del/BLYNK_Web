import "./Toast.css";

const Toast = ({
  type = "success",
  message,
  visible
}) => {

  if (!visible) return null;

  return (

    <div className={`toast ${type}`}>

      {message}

    </div>

  );

};

export default Toast;