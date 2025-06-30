import React from 'react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Task } from '../types';
import { cn } from '../utils/cn';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface DeadlinesWidgetProps {
  tasks: Task[];
  className?: string;
}

export const DeadlinesWidget: React.FC<DeadlinesWidgetProps> = ({
  tasks,
  className
}) => {
  const upcomingTasks = tasks
    .filter(task => task.status !== 'DONE' && task.status !== 'CANCELLED')
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 10);

  const getDeadlineStatus = (dueDate: Date) => {
    if (isPast(dueDate)) return 'overdue';
    if (isToday(dueDate)) return 'today';
    if (isTomorrow(dueDate)) return 'tomorrow';
    return 'upcoming';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'today':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'tomorrow':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'border-red-200 bg-red-50';
      case 'today':
        return 'border-orange-200 bg-orange-50';
      case 'tomorrow':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'Overdue';
      case 'today':
        return 'Due Today';
      case 'tomorrow':
        return 'Due Tomorrow';
      default:
        return 'Upcoming';
    }
  };

  return (
    <div className={cn('card', className)}>
      <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
      
      <div className="space-y-3">
        {upcomingTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
            <p>No upcoming deadlines!</p>
          </div>
        ) : (
          upcomingTasks.map((task) => {
            const status = getDeadlineStatus(task.dueDate);
            return (
              <div
                key={task.id}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border',
                  getStatusColor(status)
                )}
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(status)}
                  <div>
                    <div className="font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-600">
                      {task.assignee?.name || 'Unassigned'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {format(task.dueDate, 'MMM dd')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getStatusText(status)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {upcomingTasks.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing {upcomingTasks.length} of {tasks.filter(t => t.status !== 'DONE' && t.status !== 'CANCELLED').length} tasks</span>
            <span className="text-primary-600 hover:text-primary-700 cursor-pointer">
              View all
            </span>
          </div>
        </div>
      )}
    </div>
  );
}; 