import React, { useEffect, useState } from "react";
import { BsPeople } from "react-icons/bs";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const API_URL = "http://127.0.0.1:5000";

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

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
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
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
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
