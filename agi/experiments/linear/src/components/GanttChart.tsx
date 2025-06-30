import React from 'react';
import { format, addDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { Task } from '../types';
import { cn } from '../utils/cn';

interface GanttChartProps {
  tasks: Task[];
  startDate: Date;
  endDate: Date;
  className?: string;
}

export const GanttChart: React.FC<GanttChartProps> = ({
  tasks,
  startDate,
  endDate,
  className
}) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  const getTaskPosition = (task: Task) => {
    const startDiff = Math.max(0, (task.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = (task.dueDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24);
    return {
      left: `${(startDiff / days.length) * 100}%`,
      width: `${(duration / days.length) * 100}%`
    };
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'DONE':
        return 'bg-green-500';
      case 'IN_PROGRESS':
        return 'bg-blue-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className={cn('card overflow-hidden', className)}>
      <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
      
      {/* Header with dates */}
      <div className="flex border-b border-gray-200 mb-4">
        <div className="w-48 flex-shrink-0 p-2 font-medium text-gray-700">Task</div>
        <div className="flex-1 flex">
          {days.map((day, index) => (
            <div
              key={index}
              className="flex-1 text-xs text-center p-1 border-r border-gray-200 last:border-r-0"
            >
              {format(day, 'MMM dd')}
            </div>
          ))}
        </div>
      </div>

      {/* Task rows */}
      <div className="space-y-2">
        {tasks.map((task) => {
          const position = getTaskPosition(task);
          return (
            <div key={task.id} className="flex items-center h-8">
              <div className="w-48 flex-shrink-0 p-2 text-sm font-medium text-gray-700 truncate">
                {task.title}
              </div>
              <div className="flex-1 relative h-6 bg-gray-100 rounded">
                <div
                  className={cn(
                    'absolute h-full rounded transition-all duration-200 cursor-pointer hover:opacity-80',
                    getStatusColor(task.status)
                  )}
                  style={{
                    left: position.left,
                    width: position.width,
                    minWidth: '20px'
                  }}
                  title={`${task.title} - ${format(task.startDate, 'MMM dd')} to ${format(task.dueDate, 'MMM dd')}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span className="text-sm text-gray-600">Todo</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Done</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
}; 