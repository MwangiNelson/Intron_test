import React, { useContext, useState } from "react";
import profileImage from "../assets/profile.png";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
import { AppContext } from "../modules/AppContext";
import { BiInfoCircle } from "react-icons/bi";
import ProfileSection from "./sections/profile";
import MorningIcon from "../assets/sunrise.png";
import AfternoonIcon from "../assets/sky.png";
import EveningIcon from "../assets/night.png";
import AllUsers from "./sections/allUsers";

const UserHomePage = () => {
  const { logout } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getGreetings = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Morning";
    } else if (hours < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  };

  const getIcon = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return MorningIcon;
    } else if (hours < 18) {
      return AfternoonIcon;
    } else {
      return EveningIcon;
    }
  };

  const Modal = ({ text }: { text: string }) => {
    return (
      <div className="w-screen bg-black/10 h-screen fixed top-0 left-0 flex items-center justify-center">
        <div className="w-1/4 h-1/4 bg-white rounded-lg p-4 flex flex-col gap-4 items-center">
          <BiInfoCircle className="text-5xl text-blue-300" />
          <p className="text-lg">{text}</p>
          <div className="flex gap-4 w-full">
            <button
              onClick={closeModal}
              className="w-1/2 bg-transparent border border-blue-400 text-blue-500 p-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={logout}
              className="w-1/2 bg-red-400 text-white p-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-screen h-screen p-4">
      {isModalOpen && <Modal text="Are you sure you want to log out?" />}
      <div className="w-full divide-x-2 divide-red-200 flex flex-row h-full bg-pink-50 rounded-lg p-4 justify-center items-center">
        <div className="w-1/4 h-full pe-3 gap-4 flex flex-col ">
          <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-row gap-2">
              <img
                src={getIcon()}
                className="w-10 h-10 object-contain"
                alt=""
              />
              <h1 className="text-3xl font-bold">Good {getGreetings()} </h1>
            </div>
            <button
              onClick={() => setActiveSection("profile")}
              className={`w-full flex flex-row justify-center items-center gap-3 p-3 text-xl font-semibold bg-transparent rounded-lg ${
                activeSection === "profile"
                  ? "text-green-400 border-green-400 border"
                  : ""
              } hover:text-white transition-all ease active:border-0 hover:bg-green-300`}
            >
              <CgProfile />
              My Profile
            </button>
            <button
              onClick={() => setActiveSection("users")}
              className={`w-full flex flex-row justify-center items-center gap-3 p-3 text-xl font-semibold bg-transparent rounded-lg ${
                activeSection === "users"
                  ? "text-green-400 border-green-400 border"
                  : ""
              } hover:text-white transition-all ease active:border-0 hover:bg-green-300`}
            >
              <BsPeople />
              All users
            </button>
          </div>
          <button
            onClick={() => openModal()}
            className="w-full flex flex-row justify-center items-center gap-3 p-3 text-xl font-semibold bg-transparent rounded-lg text-red-400 border-red-400 border hover:text-white transition-all ease active:border-0 hover:bg-red-500"
          >
            <CgLogOut />
            Log Out
          </button>
        </div>
        <div className="w-3/4 h-full">
          {activeSection === "profile" && <ProfileSection />}
          {activeSection === "users" && <AllUsers />}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
