import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './styles/theme';

import { GlobalStyle } from './styles/global';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <TransactionsProvider>
        <Header
          onOpenNewTransactionModal={handleOpenNewTransactionModal}
        />
        <Dashboard />

        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
        />

        <GlobalStyle />

      </TransactionsProvider>
    </ThemeProvider>
  );
}
