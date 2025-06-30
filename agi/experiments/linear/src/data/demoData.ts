
import { Project, Task, TeamMember, Milestone } from '../types';

export const demoTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    role: 'Frontend Developer',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@company.com',
    role: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@company.com',
    role: 'UI/UX Designer',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@company.com',
    role: 'Product Manager',
    avatar: 'https://i.pravatar.cc/150?img=4'
  }
];

export const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Implementation',
    description: 'Create and implement a comprehensive design system',
    status: 'DONE',
    priority: 'HIGH',
    assigneeId: '3',
    assignee: demoTeamMembers[2],
    startDate: new Date('2024-01-01'),
    dueDate: new Date('2024-01-15'),
    estimatedHours: 40,
    actualHours: 38,
    tags: ['design', 'frontend']
  },
  {
    id: '2',
    title: 'API Authentication Setup',
    description: 'Implement JWT authentication for the API',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    assigneeId: '2',
    assignee: demoTeamMembers[1],
    startDate: new Date('2024-01-10'),
    dueDate: new Date('2024-01-25'),
    estimatedHours: 32,
    actualHours: 20,
    tags: ['backend', 'security']
  },
  {
    id: '3',
    title: 'Dashboard Components',
    description: 'Build reusable dashboard components',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    assigneeId: '1',
    assignee: demoTeamMembers[0],
    startDate: new Date('2024-01-05'),
    dueDate: new Date('2024-01-20'),
    estimatedHours: 24,
    actualHours: 16,
    tags: ['frontend', 'components']
  },
  {
    id: '4',
    title: 'Database Schema Design',
    description: 'Design and implement database schema',
    status: 'TODO',
    priority: 'HIGH',
    assigneeId: '2',
    assignee: demoTeamMembers[1],
    startDate: new Date('2024-01-15'),
    dueDate: new Date('2024-01-30'),
    estimatedHours: 48,
    actualHours: 0,
    tags: ['backend', 'database']
  },
  {
    id: '5',
    title: 'User Research & Testing',
    description: 'Conduct user research and usability testing',
    status: 'TODO',
    priority: 'MEDIUM',
    assigneeId: '3',
    assignee: demoTeamMembers[2],
    startDate: new Date('2024-01-20'),
    dueDate: new Date('2024-02-05'),
    estimatedHours: 20,
    actualHours: 0,
    tags: ['research', 'ux']
  },
  {
    id: '6',
    title: 'Project Planning & Roadmap',
    description: 'Create detailed project plan and roadmap',
    status: 'DONE',
    priority: 'URGENT',
    assigneeId: '4',
    assignee: demoTeamMembers[3],
    startDate: new Date('2023-12-20'),
    dueDate: new Date('2024-01-05'),
    estimatedHours: 16,
    actualHours: 14,
    tags: ['planning', 'management']
  },
  {
    id: '7',
    title: 'Performance Optimization',
    description: 'Optimize application performance',
    status: 'TODO',
    priority: 'LOW',
    assigneeId: '1',
    assignee: demoTeamMembers[0],
    startDate: new Date('2024-02-01'),
    dueDate: new Date('2024-02-15'),
    estimatedHours: 28,
    actualHours: 0,
    tags: ['performance', 'frontend']
  },
  {
    id: '8',
    title: 'Documentation Update',
    description: 'Update project documentation',
    status: 'CANCELLED',
    priority: 'LOW',
    assigneeId: '4',
    assignee: demoTeamMembers[3],
    startDate: new Date('2024-01-25'),
    dueDate: new Date('2024-02-10'),
    estimatedHours: 12,
    actualHours: 0,
    tags: ['documentation']
  }
];

export const demoMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Design Phase Complete',
    description: 'All design work completed and approved',
    dueDate: new Date('2024-01-15'),
    status: 'COMPLETED',
    tasks: ['1']
  },
  {
    id: '2',
    title: 'Core Development',
    description: 'Core application features implemented',
    dueDate: new Date('2024-01-30'),
    status: 'IN_PROGRESS',
    tasks: ['2', '3', '4']
  },
  {
    id: '3',
    title: 'Testing & QA',
    description: 'Comprehensive testing and quality assurance',
    dueDate: new Date('2024-02-15'),
    status: 'UPCOMING',
    tasks: ['5', '7']
  },
  {
    id: '4',
    title: 'Production Launch',
    description: 'Application ready for production deployment',
    dueDate: new Date('2024-03-01'),
    status: 'UPCOMING',
    tasks: []
  }
];

export const demoProject: Project = {
  id: 'demo-project',
  name: 'E-Commerce Platform Redesign',
  description: 'Complete redesign and modernization of the company e-commerce platform',
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-03-01'),
  status: 'ACTIVE',
  teamMembers: demoTeamMembers,
  tasks: demoTasks,
  milestones: demoMilestones
}; 