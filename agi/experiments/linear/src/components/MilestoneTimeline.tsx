import React from 'react';
import { format, isPast, isToday } from 'date-fns';
import { Milestone } from '../types';
import { cn } from '../utils/cn';
import { Flag, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  className?: string;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  milestones,
  className
}) => {
  const sortedMilestones = [...milestones].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const getMilestoneStatus = (milestone: Milestone) => {
    if (milestone.status === 'COMPLETED') return 'completed';
    if (milestone.status === 'OVERDUE') return 'overdue';
    if (isToday(milestone.dueDate)) return 'today';
    if (isPast(milestone.dueDate)) return 'overdue';
    return 'upcoming';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'today':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <Flag className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'overdue':
        return 'border-red-200 bg-red-50';
      case 'today':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className={cn('card', className)}>
      <h3 className="text-lg font-semibold mb-4">Milestone Timeline</h3>
      
      <div className="space-y-4">
        {sortedMilestones.map((milestone, index) => {
          const status = getMilestoneStatus(milestone);
          const isLast = index === sortedMilestones.length - 1;
          
          return (
            <div key={milestone.id} className="relative">
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-6 top-10 w-0.5 h-16 bg-gray-200" />
              )}
              
              {/* Milestone item */}
              <div className={cn(
                'flex items-start space-x-4 p-4 rounded-lg border',
                getStatusColor(status)
              )}>
                <div className="flex-shrink-0">
                  {getStatusIcon(status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-900">
                      {milestone.title}
                    </h4>
                    <span className="text-sm font-medium text-gray-600">
                      {format(milestone.dueDate, 'MMM dd, yyyy')}
                    </span>
                  </div>
                  
                  {milestone.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {milestone.description}
                    </p>
                  )}
                  
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Flag className="w-4 h-4" />
                      <span>{milestone.tasks.length} tasks</span>
                    </span>
                    
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      status === 'completed' && 'bg-green-100 text-green-800',
                      status === 'overdue' && 'bg-red-100 text-red-800',
                      status === 'today' && 'bg-orange-100 text-orange-800',
                      status === 'upcoming' && 'bg-blue-100 text-blue-800'
                    )}>
                      {milestone.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {sortedMilestones.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Flag className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No milestones defined</p>
        </div>
      )}
    </div>
  );
}; 