import { FolderOpen, Plus } from 'lucide-react'
import React from 'react'

const ProjectSidebar = ({ projects, setSelectedProject, setShowProjectForm, selectedProject }) => {


  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Projects</h2>
            <button
              onClick={() => setShowProjectForm(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <button
                key={project._id}
                onClick={() => setSelectedProject(project)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${selectedProject?._id === project._id
                  ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-md'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedProject?._id === project._id
                    ? 'bg-blue-100'
                    : 'bg-gray-200'
                    }`}>
                    <FolderOpen className={`h-5 w-5 ${selectedProject?._id === project._id
                      ? 'text-blue-600'
                      : 'text-gray-600'
                      }`} />
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900 block">{project.name}</span>
                    {project.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectSidebar
