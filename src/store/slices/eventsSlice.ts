import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WalletEvent } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface EventsState {
  events: WalletEvent[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  searchTerm: '',
};

// Load events from localStorage
export const loadEvents = createAsyncThunk(
  'events/loadEvents',
  async () => {
    const savedEvents = localStorage.getItem('walletfy-events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  }
);

// Save events to localStorage
export const saveEvents = createAsyncThunk(
  'events/saveEvents',
  async (events: WalletEvent[]) => {
    localStorage.setItem('walletfy-events', JSON.stringify(events));
    return events;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<WalletEvent, 'id'>>) => {
      const newEvent: WalletEvent = {
        ...action.payload,
        id: uuidv4(),
      };
      state.events.push(newEvent);
    },
    updateEvent: (state, action: PayloadAction<WalletEvent>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading events';
      })
      .addCase(saveEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      });
  },
});

export const { addEvent, updateEvent, deleteEvent, setSearchTerm, clearError } = eventsSlice.actions;
export default eventsSlice.reducer;