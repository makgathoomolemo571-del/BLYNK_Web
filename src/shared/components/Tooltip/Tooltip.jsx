import { useState } from "react";
import "./Tooltip.css";

const Tooltip = ({
  text,
  children
}) => {

  const [show, setShow] =
    useState(false);

  return (

    <div
      className="tooltip-wrapper"
      onMouseEnter={() =>
        setShow(true)
      }
      onMouseLeave={() =>
        setShow(false)
      }
    >

      {children}

      {show && (

        <div className="tooltip">

          {text}

        </div>

      )}

    </div>

  );

};

export default Tooltip;