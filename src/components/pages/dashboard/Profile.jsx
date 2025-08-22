import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { UserIcon, PencilIcon, CameraIcon } from '@heroicons/react/24/outline';

function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Team Member',
    email: user?.email || 'member@frc7598.com',
    role: user?.role || 'Member',
    team: 'Programming Team',
    joinDate: '2023-09-01',
    bio: 'Passionate about robotics and programming. Love working with the team to build amazing robots!'
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any changes
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-black border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Profile</h1>
            <p className="text-gray-400 mt-1">Manage your account settings</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-sca-purple hover:bg-sca-purple-light text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <PencilIcon className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          {/* Avatar Section */}
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-sca-purple rounded-full flex items-center justify-center">
                <UserIcon className="w-12 h-12 text-white" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-sca-purple hover:bg-sca-purple-light text-white rounded-full p-2 transition-colors">
                  <CameraIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
              <p className="text-gray-400">{profileData.role} • FRC Team 7598</p>
              <p className="text-gray-500 text-sm">Member since {new Date(profileData.joinDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sca-purple"
                />
              ) : (
                <p className="text-white bg-gray-800 px-3 py-2 rounded-lg">{profileData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sca-purple"
                />
              ) : (
                <p className="text-white bg-gray-800 px-3 py-2 rounded-lg">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Team Role</label>
              {isEditing ? (
                <select
                  value={profileData.team}
                  onChange={(e) => setProfileData({ ...profileData, team: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sca-purple"
                >
                  <option>Programming Team</option>
                  <option>Build Team</option>
                  <option>Drive Team</option>
                  <option>Outreach Team</option>
                  <option>Business Team</option>
                </select>
              ) : (
                <p className="text-white bg-gray-800 px-3 py-2 rounded-lg">{profileData.team}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Account Type</label>
              <p className="text-white bg-gray-800 px-3 py-2 rounded-lg">{profileData.role}</p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sca-purple"
              />
            ) : (
              <p className="text-white bg-gray-800 px-3 py-2 rounded-lg">{profileData.bio}</p>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleSave}
                className="bg-sca-purple hover:bg-sca-purple-light text-white px-6 py-2 rounded-lg transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;