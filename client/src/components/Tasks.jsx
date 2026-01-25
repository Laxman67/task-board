import { Plus, Trash2 } from 'lucide-react'
import React from 'react'

const Tasks = ({ setShowTaskForm, selectedProject, tasks, getStatusIcon, updateTaskStatus, deleteTask }) => {
  return (
    <>
      <div className="lg:col-span-2">
        {selectedProject ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">


              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedProject.name}</h2>
                {selectedProject.description && (
                  <p className="text-gray-600 mt-1">{selectedProject.description}</p>
                )}

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                    <div className="text-sm text-blue-600 font-medium">Total Tasks</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">{tasks.filter((task) => task.status === 'Done').length}</div>
                    <div className="text-sm text-green-600 font-medium">Completed</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-amber-600">{tasks.filter((task) => task.status === 'In Progress').length}</div>
                    <div className="text-sm text-amber-600 font-medium">In Progress</div>
                  </div>
                </div>
              </div>



              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </button>


            </div>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tasks yet. Create your first task!</p>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          {task.description && (
                            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                          className="text-sm border border-gray-300 rounded-md px-2 py-1"
                        >
                          <option value="Todo">Todo</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                        </select>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">Select a project to view tasks</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Tasks
