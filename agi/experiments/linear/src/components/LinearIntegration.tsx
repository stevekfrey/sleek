/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { LinearAPI, convertLinearPriority, convertLinearState } from '../services/linearApi';
import { Project, Task, TeamMember, LinearIssue, LinearTeam, LinearMilestone, Milestone } from '../types';
import { cn } from '../utils/cn';
import { Key, Download, Users, CheckCircle, AlertCircle } from 'lucide-react';

interface LinearIntegrationProps {
  onDataImported: (project: Project) => void;
  className?: string;
}

export const LinearIntegration: React.FC<LinearIntegrationProps> = ({
  onDataImported,
  className
}) => {
  // Use env var if available
  const envApiKey = import.meta.env.VITE_LINEAR_API_KEY || '';
  const [apiKey, setApiKey] = useState(envApiKey);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [teams, setTeams] = useState<LinearTeam[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [importedData, setImportedData] = useState<{
    issues: LinearIssue[];
    teamMembers: TeamMember[];
  } | null>(null);

  // When teams are loaded, select 'AGI' if present
  useEffect(() => {
    if (teams.length > 0) {
      const agiTeam = teams.find(t => t.name.toLowerCase() === 'agi');
      if (agiTeam) {
        setSelectedTeam(agiTeam.id);
      } else {
        setSelectedTeam(teams[0].id);
      }
    }
  }, [teams]);

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your Linear API key');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const linearApi = new LinearAPI(apiKey);
      const fetchedTeams = await linearApi.getTeams();
      setTeams(fetchedTeams);
      
      if (fetchedTeams.length > 0) {
        setSelectedTeam(fetchedTeams[0].id);
      }
    } catch (err) {
      setError('Failed to connect to Linear. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportData = async () => {
    if (!selectedTeam) {
      setError('Please select a team');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const linearApi = new LinearAPI(apiKey);
      const issues = await linearApi.getIssues(selectedTeam);
      
      // Extract unique team members from issues
      const memberMap = new Map<string, TeamMember>();
      
      issues.forEach(issue => {
        if (issue.assignee && !memberMap.has(issue.assignee.id)) {
          memberMap.set(issue.assignee.id, {
            id: issue.assignee.id,
            name: issue.assignee.name,
            email: issue.assignee.email,
            role: 'Developer'
          });
        }
      });

      const teamMembers = Array.from(memberMap.values());
      
      setImportedData({ issues, teamMembers });
    } catch (err) {
      setError('Failed to import data from Linear');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!importedData) return;

    const selectedTeamData = teams.find(t => t.id === selectedTeam);
    const linearApi = new LinearAPI(apiKey);
    let milestones: Milestone[] = [];
    try {
      const linearMilestones: LinearMilestone[] = await linearApi.getMilestones(selectedTeam);
      milestones = linearMilestones.map((m) => {
        const dueDate = new Date(m.targetDate);
        let status: Milestone['status'] = 'UPCOMING';
        const now = new Date();
        if (dueDate.toDateString() === now.toDateString()) {
          status = 'IN_PROGRESS';
        } else if (dueDate < now) {
          status = 'COMPLETED';
        }
        return {
          id: m.id,
          title: m.name,
          description: m.description,
          dueDate,
          status,
          tasks: [] // Could be mapped if available
        };
      });
    } catch (err) {
      // If milestone fetch fails, fallback to empty
      milestones = [];
    }

    // Convert Linear issues to our Task format
    const tasks: Task[] = importedData.issues.map(issue => ({
      id: issue.id,
      title: issue.title,
      description: issue.description || undefined,
      status: convertLinearState(issue.state.name),
      priority: convertLinearPriority(issue.priority),
      assigneeId: issue.assignee?.id,
      assignee: importedData.teamMembers.find(m => m.id === issue.assignee?.id),
      startDate: new Date(issue.createdAt),
      dueDate: issue.dueDate ? new Date(issue.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 1 week from now
      estimatedHours: 8, // Default estimate
      tags: (issue.labels?.nodes ?? []).map(label => label.name),
      linearIssueId: issue.id
    }));

    // Create a project from the imported data
    const project: Project = {
      id: `linear-${selectedTeam}`,
      name: selectedTeamData?.name || 'Linear Project',
      description: `Imported from Linear team: ${selectedTeamData?.name}`,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: 'ACTIVE',
      teamMembers: importedData.teamMembers,
      tasks,
      milestones
    };

    onDataImported(project);
  };

  return (
    <div className={cn('card', className)}>
      <h3 className="text-lg font-semibold mb-4">Linear Integration</h3>
      
      <div className="space-y-4">
        {/* API Key Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Linear API Key
          </label>
          <div className="flex space-x-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Linear API key"
              className="input-field flex-1"
            />
            <button
              onClick={handleConnect}
              disabled={isLoading || !apiKey.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Connecting...' : 'Connect'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Get your API key from Linear Settings → API → Personal API Keys
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Team Selection */}
        {teams.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Team
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="input-field"
            >
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Import Button */}
        {teams.length > 0 && selectedTeam && (
          <button
            onClick={handleImportData}
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Importing...' : 'Import Team Data'}
          </button>
        )}

        {/* Imported Data Summary */}
        {importedData && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h4 className="font-medium text-green-800">Data Imported Successfully</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{importedData.teamMembers.length} team members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4 text-gray-500" />
                <span>{importedData.issues.length} issues</span>
              </div>
            </div>

            <button
              onClick={handleCreateProject}
              className="btn-primary w-full mt-3"
            >
              Create Project Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 