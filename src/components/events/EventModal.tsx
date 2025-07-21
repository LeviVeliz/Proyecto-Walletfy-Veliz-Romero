import React from 'react';
import { Calendar, DollarSign, FileText, Image, TrendingUp, TrendingDown } from 'lucide-react';
import { WalletEvent } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/currencyUtils';
import { Modal } from '../ui/Modal';

interface EventModalProps {
  event: WalletEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!event) return null;

  const isIncome = event.tipo === 'ingreso';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalles del Evento"
      size="md"
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${isIncome ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
            {isIncome ? (
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {event.nombre}
            </h3>
            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
              isIncome 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {event.tipo}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {formatDate(event.fecha)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cantidad</p>
              <p className={`font-bold text-lg ${
                isIncome ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {isIncome ? '+' : '-'}{formatCurrency(event.cantidad)}
              </p>
            </div>
          </div>
        </div>

        {event.descripcion && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Descripción</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              {event.descripcion}
            </p>
          </div>
        )}

        {event.adjunto && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Image className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Imagen Adjunta</h4>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <img 
                src={event.adjunto} 
                alt="Adjunto del evento" 
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};