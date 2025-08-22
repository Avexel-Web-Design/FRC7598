import { useState } from 'react';
import { CalendarIcon, PlusIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

function Calendar() {
  const [events] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      date: '2024-01-15',
      time: '3:00 PM',
      location: 'Engineering Room',
      type: 'meeting',
      description: 'Weekly team coordination meeting'
    },
    {
      id: 2,
      title: 'Competition Practice',
      date: '2024-01-17',
      time: '4:00 PM',
      location: 'Gymnasium',
      type: 'practice',
      description: 'Robot driving practice and strategy review'
    },
    {
      id: 3,
      title: 'Build Session',
      date: '2024-01-18',
      time: '6:00 PM',
      location: 'Workshop',
      type: 'build',
      description: 'Work on robot modifications'
    },
    {
      id: 4,
      title: 'Regional Competition',
      date: '2024-01-25',
      time: '8:00 AM',
      location: 'Convention Center',
      type: 'competition',
      description: 'FRC Regional Competition - Day 1'
    },
  ]);

  const getEventColor = (type) => {
    switch (type) {
      case 'meeting': return 'bg-blue-600';
      case 'practice': return 'bg-green-600';
      case 'build': return 'bg-sca-purple';
      case 'competition': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Calendar</h1>
            <p className="text-gray-400 mt-1">Team events and schedule</p>
          </div>
          <button className="bg-sca-purple hover:bg-sca-purple-light text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <PlusIcon className="w-5 h-5" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 cursor-pointer transition-colors border border-gray-700"
            >
              <div className="flex items-start space-x-4">
                <div className={`${getEventColor(event.type)} rounded-lg p-2 flex-shrink-0`}>
                  <CalendarIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-lg">{event.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  {event.description && (
                    <p className="text-gray-300 text-sm mt-2">{event.description}</p>
                  )}
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'meeting' ? 'bg-blue-600/20 text-blue-400' :
                      event.type === 'practice' ? 'bg-green-600/20 text-green-400' :
                      event.type === 'build' ? 'bg-sca-purple/20 text-purple-400' :
                      event.type === 'competition' ? 'bg-red-600/20 text-red-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;