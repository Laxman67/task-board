import { Plus } from 'lucide-react'
import React from 'react'
import ProjectsList from './ProjectsList'

const ProjectSidebar = ({ projects, setSelectedProject, setShowProjectForm, selectedProject, onEditProject, onDeleteProject }) => {


  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">

          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Projects</h2>
                {/* To Display projects length */}
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  {projects?.length || 0}
                </span>
              </div>
              <span className="text-sm text-gray-600 italic">Hover on Projects to Edit and Delete</span>
            </div>
            <button
              onClick={() => setShowProjectForm(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects && <ProjectsList projects={projects} setSelectedProject={setSelectedProject} selectedProject={selectedProject} onDeleteProject={onDeleteProject} onEditProject={onEditProject} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectSidebar
