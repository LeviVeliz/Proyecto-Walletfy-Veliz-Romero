import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks';
import { loadEvents } from './store/slices/eventsSlice';
import { loadTheme, saveTheme } from './store/slices/themeSlice';
import { WalletEvent } from './types';
import { Header } from './components/layout/Header';
import { BalanceView } from './components/balance/BalanceView';
import { EventForm } from './components/events/EventForm';

type ViewMode = 'balance' | 'form';

function AppContent() {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.events);
  const { theme } = useAppSelector((state) => state.theme);
  
  const [viewMode, setViewMode] = useState<ViewMode>('balance');
  const [editingEvent, setEditingEvent] = useState<WalletEvent | undefined>();

  useEffect(() => {
    dispatch(loadEvents());
    dispatch(loadTheme());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleCreateEvent = () => {
    setEditingEvent(undefined);
    setViewMode('form');
  };

  const handleEditEvent = (event: WalletEvent) => {
    setEditingEvent(event);
    setViewMode('form');
  };

  const handleCancelForm = () => {
    setEditingEvent(undefined);
    setViewMode('balance');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {viewMode === 'balance' && (
        <Header onCreateEvent={handleCreateEvent} />
      )}
      
      {viewMode === 'balance' ? (
        <BalanceView onEditEvent={handleEditEvent} />
      ) : (
        <EventForm
          editingEvent={editingEvent}
          onCancel={handleCancelForm}
          events={events}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;