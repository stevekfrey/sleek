import React, { useState, useMemo } from 'react';
import { Project, Task, FilterOptions } from '../types';
import { ProgressBar } from './ProgressBar';
import { GanttChart } from './GanttChart';
import { WorkloadChart } from './WorkloadChart';
import { DeadlinesWidget } from './DeadlinesWidget';
import { MilestoneTimeline } from './MilestoneTimeline';
import { FilterPanel } from './FilterPanel';
import { cn } from '../utils/cn';
import { BarChart3, Users, Calendar, Target } from 'lucide-react';

interface ProjectDashboardProps {
  project: Project;
  className?: string;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  project,
  className
}) => {
  const [filters, setFilters] = useState<FilterOptions>({});

  // Filter tasks based on current filters
  const filteredTasks = useMemo(() => {
    return project.tasks.filter(task => {
      if (filters.assignee && task.assigneeId !== filters.assignee) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.status && task.status !== filters.status) return false;
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => task.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }
      return true;
    });
  }, [project.tasks, filters]);

  // Calculate project statistics
  const projectStats = useMemo(() => {
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(t => t.status === 'DONE').length;
    const inProgressTasks = project.tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const overdueTasks = project.tasks.filter(t => 
      t.status !== 'DONE' && t.status !== 'CANCELLED' && new Date() > t.dueDate
    ).length;

    const totalHours = project.tasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const completedHours = project.tasks
      .filter(task => task.status === 'DONE')
      .reduce((sum, task) => sum + (task.actualHours || task.estimatedHours), 0);

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      totalHours,
      completedHours,
      hoursCompletionRate: totalHours > 0 ? (completedHours / totalHours) * 100 : 0
    };
  }, [project.tasks]);

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              {project.description && (
                <p className="mt-1 text-gray-600">{project.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Project Status</div>
                <div className="text-lg font-semibold text-gray-900">{project.status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Total Tasks</div>
                <div className="text-2xl font-bold text-gray-900">{projectStats.totalTasks}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Completed</div>
                <div className="text-2xl font-bold text-gray-900">{projectStats.completedTasks}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">In Progress</div>
                <div className="text-2xl font-bold text-gray-900">{projectStats.inProgressTasks}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Team Members</div>
                <div className="text-2xl font-bold text-gray-900">{project.teamMembers.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Task Completion Progress</h3>
            <ProgressBar
              progress={projectStats.completionRate}
              size="lg"
              color="blue"
            />
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{projectStats.completedTasks}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{projectStats.inProgressTasks}</div>
                <div className="text-sm text-gray-500">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{projectStats.overdueTasks}</div>
                <div className="text-sm text-gray-500">Overdue</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Hours Progress</h3>
            <ProgressBar
              progress={projectStats.hoursCompletionRate}
              size="lg"
              color="green"
            />
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{projectStats.completedHours}</div>
                <div className="text-sm text-gray-500">Hours Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{projectStats.totalHours}</div>
                <div className="text-sm text-gray-500">Total Hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              teamMembers={project.teamMembers}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Gantt Chart */}
            <GanttChart
              tasks={filteredTasks}
              startDate={project.startDate}
              endDate={project.endDate}
            />

            {/* Workload Chart */}
            <WorkloadChart
              teamMembers={project.teamMembers}
              tasks={filteredTasks}
            />

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DeadlinesWidget tasks={filteredTasks} />
              <MilestoneTimeline milestones={project.milestones} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 