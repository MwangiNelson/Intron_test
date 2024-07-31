import React from "react";
import { BiCheckCircle, BiInfoCircle } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { MdDangerous, MdWarningAmber } from "react-icons/md";

interface PopupModalProps {
  event: "info" | "warning" | "success" | "danger";
  text: string;
  action: () => void;
  closeModal: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({
  event,
  text,
  action,
  closeModal,
}) => {
  const renderIcon = () => {
    switch (event) {
      case "info":
        return <BiInfoCircle className="text-7xl text-blue-300" />;
      case "warning":
        return <MdWarningAmber className="text-7xl text-yellow-500" />;
      case "success":
        return <BiCheckCircle className="text-7xl text-green-500" />;
      case "danger":
        return <CgDanger className="!text-7xl text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-screen bg-black/10 h-screen fixed top-0 left-0 flex items-center justify-center z-20">
      <div className="w-1/4 h-fit bg-white rounded-lg p-4 flex flex-col gap-4 items-center">
        {renderIcon()}
        <p className="text-lg text-center">{text}</p>
        <div className="flex gap-4 w-full">
          <button
            onClick={closeModal}
            className="w-1/2 bg-transparent border border-blue-400 text-blue-500 p-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={action}
            className="w-1/2 bg-red-400 text-white p-2 rounded-lg"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
