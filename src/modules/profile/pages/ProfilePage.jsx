import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProfile,
  fetchMyProfile,
} from "../store/profileActions";

import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfileBio from "../components/ProfileBio";
import ProfileGallery from "../components/ProfileGallery";
import ProfileTabs from "../components/ProfileTabs";

const ProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
const [activeTab, setActiveTab] = useState("posts");
  const { profile, loading, error } = useSelector(
    (state) => state.profile
  );
const [referralNumber, setReferralNumber] = useState("");
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile(userId));
    } else {
      dispatch(fetchMyProfile());
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!profile) return null;

 const isOwnProfile =
  authUser?.displayName === profile?.user?.displayName;

console.log("AUTH USER =", authUser);
console.log("PROFILE USER =", profile.user);

console.log("authUser._id =", authUser?._id);
console.log("authUser.id =", authUser?.id);

console.log("profile.user.id =", profile.user?.id);
console.log("profile.user._id =", profile.user?._id);

console.log("PROFILE =", profile);
console.log("PROFILE USER =", profile.user);
console.log("PROFILE PICTURE =", profile.profilePicture);
console.log("USER PICTURE =", profile.user?.profilePicture);
console.log("BANNER =", profile.coverBanner);
console.log("USER BANNER =", profile.user?.coverBanner);
  return (
  <div className="min-h-screen bg-zinc-100 dark:bg-black">

      <ProfileHeader
  profile={profile}
  user={profile.user}
  stats={profile.stats}
  isOwnProfile={isOwnProfile}
/>

{profile.user?.referralCode && (
  <div className="max-w-6xl mx-auto px-4 mt-4">
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">

      <div className="flex items-center justify-between gap-4">

        <div>
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            BLYNK REFERRAL NUMBER
          </p>

          <p className="text-2xl font-bold tracking-wider text-purple-600">
            {profile.user.referralCode}
          </p>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Share your referral number with friends and earn referral rewards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(
              profile.user.referralCode
            );
          }}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700"
        >
          Copy
        </button>

      </div>

    </div>
  </div>
)}

    <div className="max-w-6xl mx-auto">

     

      <ProfileTabs
    active={activeTab}
    onChange={setActiveTab}
/>

      {activeTab==="posts" && <ProfileGallery />}

    </div>

  </div>
);
};

export default ProfilePage;