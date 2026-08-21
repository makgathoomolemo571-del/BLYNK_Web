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

  const [referralNumber, setReferralNumber] = useState("");

  const [generatingReferral, setGeneratingReferral] =
    useState(false);

  const [referralError, setReferralError] =
    useState("");

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
  // GET REFERRAL NUMBER FROM PROFILE
  // =====================================================

  useEffect(() => {

    if (profile?.user?.referralCode) {

      setReferralNumber(
        profile.user.referralCode
      );

    }

  }, [profile]);


  // =====================================================
  // GENERATE REFERRAL NUMBER
  // =====================================================

  const generateReferralNumber = async () => {

    try {

      setGeneratingReferral(true);

      setReferralError("");


      const token =
        localStorage.getItem("accessToken");


      const response =
        await fetch(
          "/api/referral/generate",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              ...(token
                ? {
                    Authorization:
                      `Bearer ${token}`
                  }
                : {})
            }
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Unable to generate referral number"
        );

      }


      if (!data.referralCode) {

        throw new Error(
          "Referral number was not returned by the server"
        );

      }


      // Save locally so the UI updates immediately
      setReferralNumber(
        data.referralCode
      );


      console.log(
        "✅ REFERRAL NUMBER:",
        data.referralCode
      );


    } catch (err) {

      console.error(
        "❌ REFERRAL GENERATION ERROR:",
        err
      );

      setReferralError(
        err.message ||
        "Unable to generate referral number"
      );

    } finally {

      setGeneratingReferral(false);

    }

  };


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


  if (!profile) return null;


  // =====================================================
  // OWN PROFILE
  // =====================================================

  const isOwnProfile =
    authUser?.displayName ===
    profile?.user?.displayName;


  console.log(
    "AUTH USER =",
    authUser
  );

  console.log(
    "PROFILE USER =",
    profile.user
  );

  console.log(
    "AUTH USER ID =",
    authUser?._id ||
    authUser?.id
  );

  console.log(
    "PROFILE USER ID =",
    profile.user?.id ||
    profile.user?._id
  );

  console.log(
    "PROFILE =",
    profile
  );


  // =====================================================
  // COPY REFERRAL
  // =====================================================

  const copyReferralNumber = async () => {

    if (!referralNumber) return;

    try {

      await navigator.clipboard.writeText(
        referralNumber
      );

      console.log(
        "✅ REFERRAL NUMBER COPIED"
      );

    } catch (err) {

      console.error(
        "❌ COPY FAILED:",
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
        user={profile.user}
        stats={profile.stats}
        isOwnProfile={isOwnProfile}
      />


      {/* =================================================
          REFERRAL SECTION
      ================================================= */}

      {isOwnProfile && (

        <div className="max-w-6xl mx-auto px-4 mt-4">

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">


            {!referralNumber ? (

              /* ==========================================
                 NO REFERRAL NUMBER YET
                 ========================================== */

              <div>

                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  BLYNK REFERRALS
                </p>


                <h3 className="text-xl font-bold mt-1">
                  Get your referral number
                </h3>


                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 mb-4">
                  Generate your personal BLYNK referral
                  number and share it with friends.
                </p>


                <button
                  type="button"
                  onClick={
                    generateReferralNumber
                  }
                  disabled={
                    generatingReferral
                  }
                  className="px-5 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >

                  {generatingReferral
                    ? "Generating..."
                    : "Generate My Referral Number"}

                </button>


                {referralError && (

                  <p className="text-sm text-red-500 mt-3">
                    {referralError}
                  </p>

                )}

              </div>

            ) : (

              /* ==========================================
                 REFERRAL NUMBER EXISTS
                 ========================================== */

              <div>

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                      BLYNK REFERRAL NUMBER
                    </p>


                    <p className="text-2xl font-bold tracking-wider text-purple-600">
                      {referralNumber}
                    </p>


                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      Share your referral number with
                      friends and earn referral rewards.
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={
                      copyReferralNumber
                    }
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700"
                  >
                    Copy
                  </button>

                </div>

              </div>

            )}

          </div>

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