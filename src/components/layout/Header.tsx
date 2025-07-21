import React from 'react';
import { Sun, Moon, Wallet, Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { saveTheme } from '../../store/slices/themeSlice';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

interface HeaderProps {
  onCreateEvent: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreateEvent }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

const handleThemeToggle = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  dispatch(saveTheme(newTheme));
};


  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Walletfy
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={onCreateEvent}
              icon={Plus}
              variant="primary"
              size="sm"
            >
              Crear Evento
            </Button>

            <Button
              onClick={handleThemeToggle}
              variant="ghost"
              size="sm"
              icon={theme === 'light' ? Moon : Sun}
              className="!p-2"
            />
          </div>
        </div>
      </Container>
    </header>
  );
};