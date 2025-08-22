import { useState } from 'react';
import { HashtagIcon, PlusIcon } from '@heroicons/react/24/outline';

function Channels() {
  const [channels] = useState([
    { id: 1, name: 'general', description: 'General team discussion', unread: 3 },
    { id: 2, name: 'announcements', description: 'Important team announcements', unread: 1 },
    { id: 3, name: 'build-team', description: 'Build team coordination', unread: 0 },
    { id: 4, name: 'programming', description: 'Programming discussions', unread: 7 },
    { id: 5, name: 'outreach', description: 'Community outreach activities', unread: 0 },
  ]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Channels</h1>
            <p className="text-gray-400 mt-1">Team communication channels</p>
          </div>
          <button className="bg-sca-purple hover:bg-sca-purple-light text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <PlusIcon className="w-5 h-5" />
            <span>New Channel</span>
          </button>
        </div>
      </div>

      {/* Channel List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 cursor-pointer transition-colors border border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="bg-sca-purple rounded-lg p-2">
                    <HashtagIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">#{channel.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{channel.description}</p>
                  </div>
                </div>
                {channel.unread > 0 && (
                  <span className="bg-sca-purple text-white text-xs px-2 py-1 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Channels;