import { FolderOpen, Plus } from 'lucide-react'
import React from 'react'

const ProjectSidebar = ({ projects, setSelectedProject, setShowProjectForm, selectedProject }) => {


  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
            <button
              onClick={() => setShowProjectForm(true)}
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-2">
            {projects.map((project) => (
              <button
                key={project._id}
                onClick={() => setSelectedProject(project)}
                className={`w-full text-left p-3 rounded-md transition-colors ${selectedProject?._id === project._id
                  ? 'bg-indigo-50 border-indigo-200 border'
                  : 'hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-gray-400 text-yellow-600 text-extrabold" />
                  <span className="font-medium text-gray-900">{project.name}</span>
                </div>
                {project.description && (
                  <p className="text-sm text-gray-500 mt-1 truncate">{project.description}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectSidebar
