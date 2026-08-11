// ProfileHeader.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileBanner from "./ProfileBanner";
import ProfileAvatar from "./ProfileAvatar";
import ProfileGallery from "./ProfileGallery";
import ProfileBio from "./ProfileBio";
import ProfileStats from "./ProfileStats";


const ProfileHeader = ({
    profile,
    user,
    stats,
    isOwnProfile
}) => {

    const authUser = useSelector(state => state.auth.user);
const navigate = useNavigate();
    
console.log("AUTH USER:", authUser);
console.log("PROFILE USER:", profile?.user);
console.log("IS OWN PROFILE PROP:", isOwnProfile);

console.log("PROFILE:", profile);
console.log("PROFILE PICTURE:", profile?.profilePicture);
console.log("USER PROFILE PICTURE:", profile?.user?.profilePicture);

console.log("COVER:", profile?.coverBanner);
console.log("USER COVER:", profile?.user?.coverBanner);
return (
  <div className="w-full bg-white dark:bg-zinc-900">

   <ProfileBanner coverBanner={profile.coverBanner} />

<div className="max-w-6xl mx-auto px-6">

  {/* Avatar + Info */}
  <div className="relative -mt-16 flex items-end justify-between">

    <div className="flex items-end gap-6">

      <ProfileAvatar
        src={profile.profilePicture}
        username={profile.user.username}
        size={128}
        isVerified={profile.user.verified}
      />

      <ProfileBio
        displayName={profile.displayName}
        bio={profile.bio}
        location={profile.location}
        website={profile.website}
      />

    </div>

    <div>
      {isOwnProfile ? (
        <button
          onClick={() => navigate("/profile/edit")}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Edit Profile
        </button>
      ) : (
        <>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
            Follow
          </button>

          <button className="ml-2 px-4 py-2 rounded-lg border">
            Message
          </button>
        </>
      )}
    </div>

  </div>

  <ProfileStats stats={stats} />

</div>
    
  </div>


  
);
};

ProfileHeader.propTypes = {
  profile: PropTypes.object,
  user: PropTypes.object,
  stats: PropTypes.object,
  isOwnProfile: PropTypes.bool,
};

export default ProfileHeader;