import moment from 'moment';
import { WalletEvent, MonthlyGroup } from '../types';

export const formatDate = (date: string): string => {
  return moment(date).format('DD/MM/YYYY');
};

export const getMonthYear = (date: string): { month: string; year: number } => {
  const momentDate = moment(date);
  return {
    month: momentDate.format('MMMM'),
    year: momentDate.year(),
  };
};

export const groupEventsByMonth = (events: WalletEvent[]): MonthlyGroup[] => {
  const groups: { [key: string]: MonthlyGroup } = {};

  events.forEach(event => {
    const { month, year } = getMonthYear(event.fecha);
    const key = `${month}-${year}`;

    if (!groups[key]) {
      groups[key] = {
        month,
        year,
        events: [],
        totalIngresos: 0,
        totalEgresos: 0,
        balance: 0,
      };
    }

    groups[key].events.push(event);

    if (event.tipo === 'ingreso') {
      groups[key].totalIngresos += event.cantidad;
    } else {
      groups[key].totalEgresos += event.cantidad;
    }

    groups[key].balance = groups[key].totalIngresos - groups[key].totalEgresos;
  });

  return Object.values(groups).sort((a, b) => {
    const dateA = moment(`${a.month} ${a.year}`, 'MMMM YYYY');
    const dateB = moment(`${b.month} ${b.year}`, 'MMMM YYYY');
    return dateB.diff(dateA);
  });
};

export const filterMonthsBySearch = (groups: MonthlyGroup[], searchTerm: string): MonthlyGroup[] => {
  if (!searchTerm.trim()) return groups;

  const lowerSearch = searchTerm.toLowerCase();
  return groups.filter(group => {
    const monthYear = `${group.month} ${group.year}`.toLowerCase();
    return monthYear.includes(lowerSearch) || group.month.toLowerCase().includes(lowerSearch);
  });
};