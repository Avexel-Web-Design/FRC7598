import { useState } from 'react';
import { ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/24/outline';

function DirectMessages() {
  const [conversations] = useState([
    { id: 1, name: 'Sarah Johnson', lastMessage: 'Hey, are you coming to the meeting?', timestamp: '2m ago', unread: 2, online: true },
    { id: 2, name: 'Mike Chen', lastMessage: 'The robot arm code is ready for testing', timestamp: '15m ago', unread: 0, online: true },
    { id: 3, name: 'Emily Davis', lastMessage: 'Great job on the presentation!', timestamp: '1h ago', unread: 1, online: false },
    { id: 4, name: 'Alex Wilson', lastMessage: 'Can you help me with the CAD file?', timestamp: '3h ago', unread: 0, online: false },
    { id: 5, name: 'Coach Roberts', lastMessage: 'Team meeting tomorrow at 3 PM', timestamp: '1d ago', unread: 0, online: false },
  ]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Direct Messages</h1>
            <p className="text-gray-400 mt-1">Private conversations with team members</p>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 cursor-pointer transition-colors border border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="bg-sca-purple rounded-lg p-2">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-medium">{conversation.name}</h3>
                      {conversation.online && (
                        <span className="text-green-400 text-xs">Online</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1 truncate">{conversation.lastMessage}</p>
                    <p className="text-gray-500 text-xs mt-1">{conversation.timestamp}</p>
                  </div>
                </div>
                {conversation.unread > 0 && (
                  <span className="bg-sca-purple text-white text-xs px-2 py-1 rounded-full">
                    {conversation.unread}
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

export default DirectMessages;