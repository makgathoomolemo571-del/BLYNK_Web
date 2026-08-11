// modules/profile/pages/EditProfilePage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateProfile,
    fetchMyProfile,
} from "../store/profileActions";

import profileAPI from "../services/profile.api";

export default function EditProfilePage() {
    const dispatch = useDispatch();

    const { profile, loading } =
        useSelector(state => state.profile);

    const [avatarFile, setAvatarFile] =
        useState(null);

    const [bannerFile, setBannerFile] =
        useState(null);

    const [avatarPreview, setAvatarPreview] =
        useState("");

    const [bannerPreview, setBannerPreview] =
        useState("");

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        displayName: "",
        bio: "",
        website: "",
        city: "",
        province: "",
        country: "",
    });

    useEffect(() => {
        dispatch(fetchMyProfile());
    }, []);

    useEffect(() => {
        if (!profile) return;

        setForm({
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            displayName: profile.displayName || "",
            bio: profile.bio || "",
            website: profile.website || "",
            city: profile.location?.city || "",
            province: profile.location?.province || "",
            country: profile.location?.country || "",
        });

        setAvatarPreview(profile.profilePicture || "");
        setBannerPreview(profile.coverBanner || "");

    }, [profile]);

    const handleChange = e => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const uploadAvatar = async () => {

        if (!avatarFile) return;

        const fd = new FormData();

        fd.append("avatar", avatarFile);

        const res =
            await profileAPI.uploadProfilePicture(fd);

        return res.data.url;

    };

    const uploadBanner = async () => {

        if (!bannerFile) return;

        const fd = new FormData();

        fd.append("banner", bannerFile);

        const res =
            await profileAPI.uploadCoverBanner(fd);

        return res.data.url;

    };

    const handleSubmit = async e => {

        e.preventDefault();

        let avatar = profile.profilePicture;
        let banner = profile.coverBanner;

        if (avatarFile)
            avatar = await uploadAvatar();

        if (bannerFile)
            banner = await uploadBanner();

        dispatch(updateProfile({

            firstName: form.firstName,

            lastName: form.lastName,

            displayName: form.displayName,

            bio: form.bio,

            website: form.website,

            profilePicture: avatar,

            coverBanner: banner,

            location: {

                city: form.city,

                province: form.province,

                country: form.country,

            },

        }));

    };

    return (

<div className="max-w-5xl mx-auto py-8">

<div className="bg-white dark:bg-zinc-900 rounded-2xl shadow overflow-hidden">

{/* Banner */}

<div className="relative h-64 bg-zinc-300">

<img

src={
bannerPreview ||
"https://placehold.co/1200x400"
}

className="w-full h-full object-cover"
/>

<label className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg cursor-pointer">

Change Banner

<input

hidden

type="file"

accept="image/*"

onChange={e=>{

const file=e.target.files[0];

if(!file) return;

setBannerFile(file);

setBannerPreview(URL.createObjectURL(file));

}}

/>

</label>

</div>

<div className="px-8 pb-8">

<div className="-mt-20 flex items-end gap-6">

<div className="relative">

<img

src={
avatarPreview ||
"https://placehold.co/200"
}

className="w-40 h-40 rounded-full border-4 border-white object-cover"
/>

<label className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded cursor-pointer">

Edit

<input

hidden

type="file"

accept="image/*"

onChange={e=>{

const file=e.target.files[0];

if(!file) return;

setAvatarFile(file);

setAvatarPreview(URL.createObjectURL(file));

}}

/>

</label>

</div>

</div>

<form
onSubmit={handleSubmit}
className="grid md:grid-cols-2 gap-6 mt-8">

<input

name="firstName"

value={form.firstName}

onChange={handleChange}

placeholder="First Name"

className="border rounded-lg p-3"

/>

<input

name="lastName"

value={form.lastName}

onChange={handleChange}

placeholder="Last Name"

className="border rounded-lg p-3"

/>

<input

name="displayName"

value={form.displayName}

onChange={handleChange}

placeholder="Display Name"

className="border rounded-lg p-3 md:col-span-2"

/>

<textarea

rows={5}

name="bio"

value={form.bio}

onChange={handleChange}

placeholder="Tell people about yourself"

className="border rounded-lg p-3 md:col-span-2"

/>

<input

name="website"

value={form.website}

onChange={handleChange}

placeholder="https://yourwebsite.com"

className="border rounded-lg p-3 md:col-span-2"

/>

<input

name="city"

value={form.city}

onChange={handleChange}

placeholder="City"

className="border rounded-lg p-3"

/>

<input

name="province"

value={form.province}

onChange={handleChange}

placeholder="Province"

className="border rounded-lg p-3"

/>

<input

name="country"

value={form.country}

onChange={handleChange}

placeholder="Country"

className="border rounded-lg p-3 md:col-span-2"

/>

<button

disabled={loading}

className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl md:col-span-2 font-semibold">

{loading
? "Saving..."
: "Save Profile"}

</button>

</form>

</div>

</div>

</div>

    );

}