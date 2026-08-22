import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchProfile,
  fetchMyProfile,
} from "../store/profileActions";
import ReferralSection from "../components/ReferralSection";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfileBio from "../components/ProfileBio";
import ProfileGallery from "../components/ProfileGallery";
import ProfileTabs from "../components/ProfileTabs";

const ProfilePage = () => {

  const { userId } = useParams();

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] =
    useState("posts");

  const {
    profile,
    loading,
    error
  } = useSelector(
    (state) => state.profile
  );

  const authUser =
    useSelector(
      (state) => state.auth.user
    );


  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {

    if (userId) {

      dispatch(
        fetchProfile(userId)
      );

    } else {

      dispatch(
        fetchMyProfile()
      );

    }

  }, [dispatch, userId]);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <div className="flex h-screen items-center justify-center">
        Loading profile...
      </div>
    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );

  }


  if (!profile) {
    return null;
  }


  // =====================================================
  // USER OBJECT
  // =====================================================

  const profileUser =
    profile.user || {};


  // =====================================================
  // IDs
  // =====================================================

  const authUserId =
    authUser?._id ||
    authUser?.id;

  const profileUserId =
    profileUser?._id ||
    profileUser?.id;


  // =====================================================
  // OWN PROFILE
  // =====================================================

  const isOwnProfile =
    authUserId &&
    profileUserId &&
    String(authUserId) ===
    String(profileUserId);


  // =====================================================
  // REFERRAL NUMBER
  // =====================================================

  const referralCode =
    profileUser.referralCode ||
    null;


  // =====================================================
  // DEBUG
  // =====================================================

  console.log(
    "========== PROFILE DEBUG =========="
  );

  console.log(
    "AUTH USER:",
    authUser
  );

  console.log(
    "PROFILE:",
    profile
  );

  console.log(
    "PROFILE USER:",
    profileUser
  );

  console.log(
    "AUTH USER ID:",
    authUserId
  );

  console.log(
    "PROFILE USER ID:",
    profileUserId
  );

  console.log(
    "OWN PROFILE:",
    isOwnProfile
  );

  console.log(
    "REFERRAL CODE:",
    referralCode
  );

  console.log(
    "PROFILE STATS:",
    profile.stats
  );

  console.log(
    "==================================="
  );


  // =====================================================
  // COPY REFERRAL
  // =====================================================

  const copyReferral = async () => {

    if (!referralCode) {
      return;
    }

    try {

      await navigator.clipboard.writeText(
        referralCode
      );

    } catch (err) {

      console.error(
        "Failed to copy referral:",
        err
      );

    }

  };


  return (

    <div className="min-h-screen bg-zinc-100 dark:bg-black">


      {/* =================================================
          PROFILE HEADER
      ================================================= */}

      <ProfileHeader
        profile={profile}
        user={profileUser}
        stats={profile.stats}
        isOwnProfile={isOwnProfile}
      />


      {/* =================================================
          REFERRAL NUMBER
      ================================================= */}

      {isOwnProfile && (
  <div className="max-w-6xl mx-auto px-4 mt-4">
    <ReferralSection />
  </div>
)}

      {/* =================================================
          PROFILE CONTENT
      ================================================= */}

      <div className="max-w-6xl mx-auto">


        <ProfileTabs
          active={activeTab}
          onChange={setActiveTab}
        />


        {activeTab === "posts" && (

          <ProfileGallery />

        )}


      </div>


    </div>

  );

};


export default ProfilePage;