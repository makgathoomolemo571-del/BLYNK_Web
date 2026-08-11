import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProfileHeader from "../../profile/components/ProfileHeader";
import ProfileBanner from "../../profile/components/ProfileBanner";
import ProfileAvatar from "../../profile/components/ProfileAvatar";
import ProfileBio from "../../profile/components/ProfileBio";
import ProfileTabs from "../../profile/components/ProfileTabs";

import UserStats from "../components/UserStats";

import { loadProfile } from "../../profile/store/profileActions";
import { selectProfile } from "../../profile/store/profileSelectors";

import { selectCurrentUser } from "../../auth/store/authSelectors";

const UserProfile = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const currentUser =
        useSelector(selectCurrentUser);

    const profile =
        useSelector(selectProfile);

    useEffect(() => {

        if (id) {

            dispatch(
                loadProfile(id)
            );

        }

    }, [dispatch, id]);

    if (!currentUser) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    if (!profile) {

        return (
            <div className="flex justify-center items-center h-screen">

                <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600" />

            </div>
        );

    }

    return (

        <main className="max-w-7xl mx-auto pb-20">

            <ProfileBanner
                banner={profile.coverBanner}
            />

            <div className="px-6 -mt-24">

                <ProfileAvatar
                    avatar={profile.profilePicture}
                    verified={currentUser.verified}
                />

                <ProfileHeader
                    displayName={profile.displayName}
                    username={currentUser.username}
                    role={currentUser.role}
                    verified={currentUser.verified}
                />

                <ProfileBio
                    bio={profile.bio}
                    website={profile.website}
                    location={profile.location}
                    socials={profile.socials}
                />

                <div className="mt-8">

                    <UserStats />

                </div>

                <div className="mt-8">

                    <ProfileTabs
                        userId={id}
                    />

                </div>

            </div>

        </main>

    );

};

export default UserProfile;