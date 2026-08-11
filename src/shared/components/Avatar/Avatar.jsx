import "./Avatar.css";

const Avatar = ({
  src,
  alt = "Avatar",
  name = "",
  size = "md",
  rounded = true,
  bordered = false,
  online = false,
  verified = false,
  onClick
}) => {

  const initials =
    name
      .trim()
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  return (

    <div
      className={`
        avatar
        avatar-${size}
        ${rounded ? "avatar-rounded" : ""}
        ${bordered ? "avatar-bordered" : ""}
      `}
      onClick={onClick}
    >

      {

        src ?

        <img
          src={src}
          alt={alt}
          loading="lazy"
        />

        :

        <div className="avatar-placeholder">

          {initials || "?"}

        </div>

      }

      {

        online &&

        <span className="avatar-online"/>

      }

      {

        verified &&

        <span className="avatar-verified">

          ✔

        </span>

      }

    </div>

  );

};

export default Avatar;