import React, { useCallback, useContext, useEffect, useState } from "react";
import profilePhoto from "./../../assets/profile.png";
import { AppContext } from "../../modules/AppContext";
import Spinner from "../../components/spinner";
import PopupModal from "../../components/PopupModal"; // Import your PopupModal
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ProfileSection = () => {
  const API_URL = "http://127.0.0.1:5000";
  const { deleteAccount, updateUserDetails } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<any>({});

  const getUserDetailsFromToken = () => {
    let token = localStorage.getItem("userToken");
    let tokenData = atob(token?.split(".")[1]);
    let userDetails = JSON.parse(tokenData);
    return userDetails.user_id;
  };

  const deleteAcc = () => {
    deleteAccount(getUserDetailsFromToken());
  };

  const getUserDetailsWithId = async (userId: number) => {
    let response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    let data = await response.json();
    setUserDetails(data);
    reset(data); // Reset the form with fetched user details
    return data;
  };

  useEffect(() => {
    let userId = getUserDetailsFromToken();
    getUserDetailsWithId(userId);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    newPassword: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      await updateUserDetails(
        data.username || null,
        data.email || null,
        data.password || null
      );
      // Optionally, show success message or reset form
    } catch (error) {
      console.error(error);
      // Optionally, show error message
    }
  };

  return (
    <div className="w-full h-full px-4">
      <div className="w-full h-full flex flex-col items-start justify-start gap-4">
        <div className="flex flex-col gap-2">
          <img src={profilePhoto} className="w-20 h-20 object-contain" alt="" />
          <h1 className="text-4xl font-bold">
            Welcome {userDetails?.username}
          </h1>
          <p>View your user profile here and edit as you please</p>
        </div>
        <hr className="w-full" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-row w-full justify-between">
            <label htmlFor="username" className="text-xl font-semibold">
              Your username
            </label>
            <input
              type="text"
              className={`w-3/4 border-0 text-slate-500 font-bold border-b-2 py-2 px-2 rounded-none active:outline-0 bg-transparent ${
                errors.username ? "border-red-500" : "border-slate-400"
              }`}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <hr className="w-full" />
          <div className="flex flex-row w-full justify-between">
            <label htmlFor="email" className="text-xl font-semibold">
              Your email
            </label>
            <input
              type="text"
              className={`w-3/4 border-0 text-slate-500 font-bold border-b-2 py-2 px-2 rounded-none active:outline-0 bg-transparent ${
                errors.email ? "border-red-500" : "border-slate-400"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <hr className="w-full" />
          <div className="flex flex-row w-full justify-between">
            <label htmlFor="password" className="text-xl font-semibold">
              Change Password
            </label>
            <div className="flex flex-row w-3/4 gap-2">
              <input
                type="password"
                className={`w-full border-0 text-slate-500 font-bold border-b-2 py-2 px-2 rounded-none active:outline-0 bg-transparent ${
                  errors.newPassword ? "border-red-500" : "border-slate-400"
                }`}
                placeholder="New Password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
          </div>
          <small>
            Password credentials are sensitive, please make sure you remember to
            keep them safe.
          </small>
          <div className="w-full flex flex-row gap-2">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md flex flex-row items-center justify-center w-1/4"
            >
              {false && <Spinner />}
              {!false && "Save Details"}
            </button>
            <button
              type="button"
              onClick={openModal}
              className="p-2 bg-red-500 text-white rounded-md flex flex-row items-center justify-center w-1/4"
            >
              {false && <Spinner />}
              {!false && "Delete Account"}
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <PopupModal
          event="danger"
          text="Are you sure you want to delete your account? This action cannot be undone."
          action={deleteAcc}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ProfileSection;
