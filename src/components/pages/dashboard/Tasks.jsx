import { useState } from 'react';
import { CheckCircleIcon, PlusIcon, ClockIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Update robot code for autonomous',
      description: 'Implement new pathfinding algorithm for autonomous period',
      completed: false,
      priority: 'high',
      dueDate: '2024-01-20',
      assignee: 'Programming Team'
    },
    {
      id: 2,
      title: 'Test drive train motors',
      description: 'Verify all motors are functioning correctly after maintenance',
      completed: true,
      priority: 'medium',
      dueDate: '2024-01-15',
      assignee: 'Build Team'
    },
    {
      id: 3,
      title: 'Prepare presentation for sponsors',
      description: 'Create slides showcasing team progress and achievements',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-25',
      assignee: 'Outreach Team'
    },
    {
      id: 4,
      title: 'Order replacement parts',
      description: 'Purchase new servo motors and sensors for backup',
      completed: false,
      priority: 'low',
      dueDate: '2024-01-30',
      assignee: 'Leadership'
    },
    {
      id: 5,
      title: 'Practice driver skills',
      description: 'Scheduled practice sessions for competition drivers',
      completed: true,
      priority: 'high',
      dueDate: '2024-01-16',
      assignee: 'Drive Team'
    },
  ]);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getPriorityTextColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-black border-b border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Tasks</h1>
            <p className="text-gray-400 mt-1">Team task management and planning</p>
          </div>
          <button className="bg-sca-purple hover:bg-sca-purple-light text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <PlusIcon className="w-5 h-5" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-lg p-4 border transition-all duration-200 ${
                task.completed 
                  ? 'bg-gray-800 border-gray-600 opacity-75' 
                  : `bg-gray-900 hover:bg-gray-800 ${getPriorityColor(task.priority)}`
              }`}
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {task.completed ? (
                    <CheckCircleIconSolid className="w-6 h-6 text-green-500" />
                  ) : (
                    <CheckCircleIcon className="w-6 h-6 text-gray-400 hover:text-sca-purple transition-colors" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                    {task.title}
                  </h3>
                  <p className={`text-sm mt-1 ${task.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                    {task.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      <ClockIcon className="w-4 h-4" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityTextColor(task.priority)} ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                    <span className="text-gray-400 text-xs">
                      Assigned to: {task.assignee}
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

export default Tasks;