import { useState } from 'react';
import { UserIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function AdminUsers() {
  const [users] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      role: 'Admin',
      team: 'Leadership',
      joinDate: '2023-08-15',
      lastActive: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@school.edu',
      role: 'Member',
      team: 'Programming Team',
      joinDate: '2023-09-01',
      lastActive: '2024-01-14',
      status: 'active'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@school.edu',
      role: 'Member',
      team: 'Build Team',
      joinDate: '2023-09-05',
      lastActive: '2024-01-13',
      status: 'active'
    },
    {
      id: 4,
      name: 'Alex Wilson',
      email: 'alex.wilson@school.edu',
      role: 'Member',
      team: 'Drive Team',
      joinDate: '2023-09-10',
      lastActive: '2024-01-10',
      status: 'inactive'
    },
    {
      id: 5,
      name: 'Coach Roberts',
      email: 'coach.roberts@school.edu',
      role: 'Admin',
      team: 'Leadership',
      joinDate: '2023-08-01',
      lastActive: '2024-01-14',
      status: 'active'
    },
  ]);

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-green-400' : 'text-gray-400';
  };

  const getRoleColor = (role) => {
    return role === 'Admin' ? 'bg-sca-purple text-white' : 'bg-gray-700 text-gray-300';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 mt-1">Manage team members and permissions</p>
          </div>
          <button className="bg-sca-purple hover:bg-sca-purple-light text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <PlusIcon className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">User</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Team</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Join Date</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Last Active</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-sca-purple rounded-full p-2">
                          <UserIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.team}</td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                      <span className={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-gray-400 hover:text-sca-purple transition-colors p-1"
                          title="Edit User"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-400 transition-colors p-1"
                          title="Delete User"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Total Users</h3>
            <p className="text-2xl font-bold text-white mt-1">{users.length}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Active Users</h3>
            <p className="text-2xl font-bold text-green-400 mt-1">
              {users.filter(u => u.status === 'active').length}
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Admins</h3>
            <p className="text-2xl font-bold text-sca-purple mt-1">
              {users.filter(u => u.role === 'Admin').length}
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400">Members</h3>
            <p className="text-2xl font-bold text-blue-400 mt-1">
              {users.filter(u => u.role === 'Member').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;