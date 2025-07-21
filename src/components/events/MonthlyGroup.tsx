import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { MonthlyGroup as MonthlyGroupType, WalletEvent } from '../../types';
import { formatCurrency } from '../../utils/currencyUtils';
import { EventCard } from './EventCard';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface MonthlyGroupProps {
  group: MonthlyGroupType;
  onEditEvent: (event: WalletEvent) => void;
  onDeleteEvent: (id: string) => void;
  onViewDetails: (event: WalletEvent) => void;
}

export const MonthlyGroup: React.FC<MonthlyGroupProps> = ({
  group,
  onEditEvent,
  onDeleteEvent,
  onViewDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="ghost"
          className="w-full !p-0 !justify-start hover:!bg-transparent"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {group.month} {group.year}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {formatCurrency(group.totalIngresos)}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-red-600 dark:text-red-400 font-medium">
                  {formatCurrency(group.totalEgresos)}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className={`font-bold ${
                  group.balance >= 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {formatCurrency(group.balance)}
                </span>
              </div>
            </div>
          </div>
        </Button>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="p-6 space-y-3">
            {group.events.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No hay eventos para este mes
              </p>
            ) : (
              group.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={onEditEvent}
                  onDelete={onDeleteEvent}
                  onViewDetails={onViewDetails}
                />
              ))
            )}
          </div>
        </div>
      )}
    </Card>
  );
};