export type EventType = 'ingreso' | 'egreso';

export interface WalletEvent {
  id: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
  fecha: string;
  tipo: EventType;
  adjunto: string;
}

export interface MonthlyGroup {
  month: string;
  year: number;
  events: WalletEvent[];
  totalIngresos: number;
  totalEgresos: number;
  balance: number;
}

export interface AppState {
  events: WalletEvent[];
  theme: 'light' | 'dark';
  searchTerm: string;
}