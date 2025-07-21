import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { deleteEvent, saveEvents, setSearchTerm } from '../../store/slices/eventsSlice';
import { groupEventsByMonth, filterMonthsBySearch } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/currencyUtils';
import { WalletEvent } from '../../types';
import { MonthlyGroup } from '../events/MonthlyGroup';
import { EventModal } from '../events/EventModal';
import { Input } from '../ui/Input';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { useDebounce } from '../../hooks/useDebounce';

interface BalanceViewProps {
  onEditEvent: (event: WalletEvent) => void;
}

export const BalanceView: React.FC<BalanceViewProps> = ({ onEditEvent }) => {
  const dispatch = useAppDispatch();
  const { events, searchTerm } = useAppSelector((state) => state.events);
  
  const [selectedEvent, setSelectedEvent] = useState<WalletEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const monthlyGroups = useMemo(() => {
    const groups = groupEventsByMonth(events);
    return filterMonthsBySearch(groups, debouncedSearchTerm);
  }, [events, debouncedSearchTerm]);

  const totalBalance = useMemo(() => {
    return events.reduce((total, event) => {
      return event.tipo === 'ingreso' 
        ? total + event.cantidad 
        : total - event.cantidad;
    }, 0);
  }, [events]);

  const totalIngresos = useMemo(() => {
    return events
      .filter(event => event.tipo === 'ingreso')
      .reduce((total, event) => total + event.cantidad, 0);
  }, [events]);

  const totalEgresos = useMemo(() => {
    return events
      .filter(event => event.tipo === 'egreso')
      .reduce((total, event) => total + event.cantidad, 0);
  }, [events]);

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      dispatch(deleteEvent(id));
      const updatedEvents = events.filter(event => event.id !== id);
      dispatch(saveEvents(updatedEvents));
    }
  };

  const handleViewDetails = (event: WalletEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <Container>
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Ingresos</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(totalIngresos)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Egresos</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(totalEgresos)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Balance Total</p>
                  <p className={`text-2xl font-bold ${
                    totalBalance >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(totalBalance)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search */}
          <Card className="p-6">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar por mes (ej: Diciembre 2024, Enero...)"
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-1"
              />
            </div>
          </Card>

          {/* Monthly Groups */}
          <div className="space-y-6">
            {monthlyGroups.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {searchTerm ? 'No se encontraron eventos para la búsqueda' : 'No hay eventos registrados'}
                </p>
                {searchTerm && (
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Intenta con otro término de búsqueda
                  </p>
                )}
              </Card>
            ) : (
              monthlyGroups.map((group) => (
                <MonthlyGroup
                  key={`${group.month}-${group.year}`}
                  group={group}
                  onEditEvent={onEditEvent}
                  onDeleteEvent={handleDeleteEvent}
                  onViewDetails={handleViewDetails}
                />
              ))
            )}
          </div>
        </div>
      </Container>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
};