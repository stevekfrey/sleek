export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assigneeId?: string;
  assignee?: TeamMember;
  startDate: Date;
  dueDate: Date;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
  linearIssueId?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE';
  tasks: string[]; // Task IDs
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';
  teamMembers: TeamMember[];
  tasks: Task[];
  milestones: Milestone[];
}

export interface LinearIssue {
  id: string;
  title: string;
  description?: string;
  state: {
    id: string;
    name: string;
    type: string;
  };
  priority: number;
  assignee?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  labels: {
    nodes: Array<{
      id: string;
      name: string;
      color: string;
    }>;
  };
  team: {
    id: string;
    name: string;
  };
}

export interface LinearTeam {
  id: string;
  name: string;
  key: string;
  description?: string;
  icon?: string;
}

export interface FilterOptions {
  assignee?: string;
  priority?: string;
  status?: string;
  tags?: string[];
}

export interface LinearMilestone {
  id: string;
  name: string;
  targetDate: string;
  projectId: string;
  description?: string;
  // Add other fields as needed from Linear's API
} 