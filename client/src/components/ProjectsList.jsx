import { Edit, FolderOpen, Trash2 } from 'lucide-react'
import React from 'react'

const ProjectsList = ({ projects, setSelectedProject, selectedProject, onDeleteProject, onEditProject }) => {
  return (
    <>
      {projects.map((project) => (
        <div
          key={project._id}
          className={`relative group rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${selectedProject?._id === project._id
            ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-md'
            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
            }`}
        >
          <button
            onClick={() => setSelectedProject(project)}
            className="w-full text-left p-4 rounded-xl"
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

          {/* Action buttons - visible on hover */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
            <button
              onClick={() => onEditProject(project)}
              className="p-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm"
              title="Edit project"
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDeleteProject(project)}
              className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
              title="Delete project"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))

      }
    </>
  )
}

export default ProjectsList
