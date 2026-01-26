import { FolderOpen, Plus, SquareArrowOutUpRight, SquarePen, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Tasks = ({ setShowTaskForm, selectedProject, tasks, getStatusIcon, updateTaskStatus, deleteTask }) => {
  return (
    <>
      <div className="lg:col-span-2">
        {selectedProject ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{selectedProject.name}</h2>
                {selectedProject.description && (
                  <p className="text-gray-600 mt-2">{selectedProject.description}</p>
                )}

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 text-center border border-blue-100">
                    <div className="text-3xl font-bold text-blue-600">{tasks.length}</div>
                    <div className="text-sm text-blue-600 font-semibold mt-1">Total Tasks</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center border border-green-100">
                    <div className="text-3xl font-bold text-green-600">{tasks.filter((task) => task.status === 'Done').length}</div>
                    <div className="text-sm text-green-600 font-semibold mt-1">Completed</div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-amber-100">
                    <div className="text-3xl font-bold text-amber-600">{tasks.filter((task) => task.status === 'In Progress').length}</div>
                    <div className="text-sm text-amber-600 font-semibold mt-1">In Progress</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Plus className="h-5 w-5" />
                Add Task
              </button>
            </div>

            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No tasks yet. Create your first task!</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 p-5 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1">
                          {getStatusIcon(task.status)}
                        </div>
                        <div className="flex-1">
                          <div className='flex gap-3'>
                            <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
                            <Link to={`/tasks/${task._id}`}>
                              <SquarePen className='h-4 w-4 text-blue-600 transition-colors duration-200 cursor-pointer' />
                            </Link>
                          </div>
                          {task.description && (
                            <p className="text-gray-600 text-sm mt-2 leading-relaxed">{task.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                          className={`text-sm border rounded-lg px-3 py-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-blue-500 transition-all duration-200 font-medium ${task.status === 'Todo'
                            ? 'border-blue-300 text-blue-700 focus:ring-blue-500'
                            : task.status === 'In Progress'
                              ? 'border-amber-300 text-amber-700 focus:ring-amber-500'
                              : 'border-green-300 text-green-700 focus:ring-green-500'
                            }`}
                        >
                          <option value="Todo" className="text-blue-700">🔵 Todo</option>
                          <option value="In Progress" className="text-amber-700">🟡 In Progress</option>
                          <option value="Done" className="text-green-700">🟢 Done</option>
                        </select>
                        <button
                          onClick={() => deleteTask(task)}

                          className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
                          title="Delete Task"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <FolderOpen className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">Select a project to view tasks</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Tasks
