import React, { useContext, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { toast } from "react-toastify";
import PopupModal from "../../components/PopupModal";
import { AppContext } from "../../modules/AppContext";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { logout } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // New state to hold the ID of the user to be deleted
  const API_URL = "http://127.0.0.1:5000";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getAllUsers = async () => {
    let response = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      setAllUsers(data);
    }
  };

  const confirmDelete = async () => {
    if (selectedUserId !== null) {
      await deleteSpecificUser(selectedUserId);
      if (
        selectedUserId ===
        JSON.parse(atob(localStorage.getItem("userToken").split(".")[1]))
          .user_id
      ) {
        logout();
      }
      setSelectedUserId(null); // Reset the selected user ID after deletion
      getAllUsers(); // Refresh the users list
      toast.success("User deleted successfully");
    }
    closeModal(); // Close the modal after deletion
  };

  const deleteSpecificUser = async (userId: number) => {
    let response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      {isModalOpen && (
        <PopupModal
          event="danger"
          text="Are you sure you want to delete this user? This action cannot be undone."
          action={confirmDelete} // Use confirmDelete here
          closeModal={closeModal}
        />
      )}
      <div className="flex flex-row gap-3">
        <BsPeople className="font-bold text-4xl" />
        <h3 className="text-4xl font-bold">All Users</h3>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">User Email</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">User Name</div>
              </th>

              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2">
            {allUsers.map((user) => (
              <tr className="bg-white  dark:border-gray-700">
                <th
                  scope="row"
                  className="px-10 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {user?.id}
                </th>
                <td className="px-6 py-4" scope="row">
                  {user.email}
                </td>
                <td className="px-6 py-4">{user.username}</td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedUserId(user.id); // Set the selected user ID
                      openModal(); // Open the modal
                    }}
                    className="w-8 h-8 bg-red-300 text-white rounded items-center justify-center flex"
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
