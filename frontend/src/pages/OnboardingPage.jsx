import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster,LoaderIcon } from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  Camera,
  CameraIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const qureyClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      qureyClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
  console.error("Onboarding Error:", error);
  toast.error(error?.response?.data?.message || "Something went wrong!");
},
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  const missingFields = [];
  if (!formState.fullName.trim()) missingFields.push("Full Name");
  if (!formState.bio.trim()) missingFields.push("Bio");
  if (!formState.nativeLanguage) missingFields.push("Native Language");
  if (!formState.learningLanguage) missingFields.push("Learning Language");
  if (!formState.location.trim()) missingFields.push("Location");

  if (missingFields.length > 0) {
    console.log("Missing Fields:", missingFields);
    toast.error(`Please fill in: ${missingFields.join(", ")}`);
    return;
  }
  console.log("Calling onboardingMutation");
  onboardingMutation(formState);
};

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; //1-100 included
    // const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png?${Date.now()}`;
    console.log(randomAvatar);
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <Toaster />
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl text-center font-bold mb-6">
            Complete your profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/*PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* PROFILE PIC */}
              <div className="size-32 rounded-full bg-base-200 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    key={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div>
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/*Generate Random Avatar btn */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-primary"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <input
                type="bio"
                placeholder="Tell others about yourself and your interests, language learning goals, hobbies etc."
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            {/* LANGUAGE */}
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                {/*select the language dropdown */}
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                {/*select the language dropdown */}
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="">Select language your're language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon
                  className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content
                 opacity-70"
                />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-20"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isPending}
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default OnboardingPage;
