"use client";
"use client";
import { useUsers } from "../../providers/UserProvider";

const UserList = () => {
  const { users, loading } = useUsers();

  if (loading) {
    return <div className="text-gray-500">Loading users...</div>;
  }

  if (!users.length) {
    return <div className="text-gray-500">No users found.</div>;
  }

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.id} className="py-2 flex items-center space-x-4">
            <img
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              alt={user.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email || "No email provided"}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;