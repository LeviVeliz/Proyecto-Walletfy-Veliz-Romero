import React from 'react';
import { Edit2, Trash2, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { WalletEvent } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/currencyUtils';
import { Tooltip } from '../ui/Tooltip';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface EventCardProps {
  event: WalletEvent;
  onEdit: (event: WalletEvent) => void;
  onDelete: (id: string) => void;
  onViewDetails: (event: WalletEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const isIncome = event.tipo === 'ingreso';

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`p-2 rounded-lg ${isIncome ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
            {isIncome ? (
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <Tooltip content={event.descripcion || 'Sin descripción'}>
                <h3 
                  className="font-medium text-gray-900 dark:text-gray-100 truncate cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => onViewDetails(event)}
                >
                  {event.nombre}
                </h3>
              </Tooltip>
              
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                isIncome 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {event.tipo}
              </span>
            </div>

            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(event.fecha)}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span className={`font-medium ${
                  isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {isIncome ? '+' : '-'}{formatCurrency(event.cantidad)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <Button
            onClick={() => onEdit(event)}
            variant="ghost"
            size="sm"
            icon={Edit2}
            className="!p-2" children={undefined}          />
          <Button
            onClick={() => onDelete(event.id)}
            variant="ghost"
            size="sm"
            icon={Trash2}
            className="!p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20" children={undefined}          />
        </div>
      </div>
    </Card>
  );
};