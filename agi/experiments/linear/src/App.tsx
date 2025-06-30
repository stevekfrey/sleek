import React, { useState } from 'react';
import { Project } from './types';
import { LinearIntegration } from './components/LinearIntegration';
import { ProjectDashboard } from './components/ProjectDashboard';
import { demoProject } from './data/demoData';
import { BarChart3, ArrowLeft, Play } from 'lucide-react';

function App() {
  const [project, setProject] = useState<Project | null>(null);

  const handleDataImported = (importedProject: Project) => {
    setProject(importedProject);
  };

  const handleBackToSetup = () => {
    setProject(null);
  };

  const handleDemoMode = () => {
    setProject(demoProject);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!project ? (
        // Setup/Integration Screen
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
                <BarChart3 className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Project Dashboard Generator
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Connect to Linear and create beautiful project dashboards
              </p>
            </div>

            {/* Demo Mode Button */}
            <div className="text-center">
              <button
                onClick={handleDemoMode}
                className="flex items-center justify-center w-full space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <Play className="w-4 h-4" />
                <span>Try Demo Dashboard</span>
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Explore the dashboard with sample data (no Linear API required)
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or connect to Linear</span>
              </div>
            </div>

            <LinearIntegration onDataImported={handleDataImported} />
          </div>
        </div>
      ) : (
        // Dashboard Screen
        <div>
          {/* Top Navigation */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleBackToSetup}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Setup</span>
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    {project.id === 'demo-project' ? 'Demo Mode' : 'Connected to Linear'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProjectDashboard project={project} />
        </div>
      )}
    </div>
  );
}

export default App; 