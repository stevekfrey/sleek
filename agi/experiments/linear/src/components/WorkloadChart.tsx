import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TeamMember, Task } from '../types';
import { cn } from '../utils/cn';

interface WorkloadChartProps {
  teamMembers: TeamMember[];
  tasks: Task[];
  className?: string;
}

export const WorkloadChart: React.FC<WorkloadChartProps> = ({
  teamMembers,
  tasks,
  className
}) => {
  const workloadData = teamMembers.map(member => {
    const memberTasks = tasks.filter(task => task.assigneeId === member.id);
    const totalHours = memberTasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const completedHours = memberTasks
      .filter(task => task.status === 'DONE')
      .reduce((sum, task) => sum + (task.actualHours || task.estimatedHours), 0);
    
    return {
      name: member.name,
      total: totalHours,
      completed: completedHours,
      remaining: totalHours - completedHours
    };
  });

  return (
    <div className={cn('card', className)}>
      <h3 className="text-lg font-semibold mb-4">Team Workload Distribution</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workloadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                `${value} hours`, 
                name === 'completed' ? 'Completed' : name === 'remaining' ? 'Remaining' : 'Total'
              ]}
            />
            <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
            <Bar dataKey="remaining" stackId="a" fill="#f59e0b" name="Remaining" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {workloadData.map((data) => (
          <div key={data.name} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900">{data.name}</div>
            <div className="text-sm text-gray-600">
              {data.completed}/{data.total} hours completed
            </div>
            <div className="text-xs text-gray-500">
              {Math.round((data.completed / data.total) * 100)}% complete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 