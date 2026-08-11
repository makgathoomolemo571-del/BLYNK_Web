import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const DEFAULT_AVATAR =
  "/assets/images/default-avatar.png";

const UserAvatar = ({
  profile = {},
  size = "md",
  rounded = true,
  bordered = false,
  clickable = false,
  loading = false,
  className = "",
  onClick
}) => {

  const avatar =
    useMemo(() => {
      return (
        profile.profilePicture ||
        DEFAULT_AVATAR
      );
    }, [profile.profilePicture]);

  const displayName =
    useMemo(() => {

      if (profile.displayName)
        return profile.displayName;

      return `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

    }, [
      profile.displayName,
      profile.firstName,
      profile.lastName
    ]);

  const sizes = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
    xl: "w-28 h-28",
    "2xl": "w-40 h-40"
  };

  if (loading) {

    return (
      <div
        className={clsx(
          sizes[size],
          rounded ? "rounded-full" : "rounded-xl",
          "animate-pulse bg-zinc-300 dark:bg-zinc-800",
          className
        )}
      />
    );

  }

  return (

    <img

      src={avatar}

      alt={
        displayName ||
        "User Avatar"
      }

      loading="lazy"

      draggable={false}

      onClick={
        clickable
          ? onClick
          : undefined
      }

      className={clsx(

        sizes[size],

        rounded
          ? "rounded-full"
          : "rounded-xl",

        bordered &&
          "border-4 border-white dark:border-zinc-900 shadow",

        clickable &&
          "cursor-pointer hover:opacity-90 transition",

        "object-cover bg-zinc-200 dark:bg-zinc-900 select-none",

        className

      )}

      onError={(e) => {
        e.target.src =
          DEFAULT_AVATAR;
      }}

    />

  );

};

UserAvatar.propTypes = {

  profile: PropTypes.shape({

    profilePicture: PropTypes.string,

    displayName: PropTypes.string,

    firstName: PropTypes.string,

    lastName: PropTypes.string

  }),

  size: PropTypes.oneOf([
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl"
  ]),

  rounded: PropTypes.bool,

  bordered: PropTypes.bool,

  clickable: PropTypes.bool,

  loading: PropTypes.bool,

  className: PropTypes.string,

  onClick: PropTypes.func

};

export default memo(UserAvatar);