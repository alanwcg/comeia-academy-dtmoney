import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de site',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 6000,
          createdAt: new Date('2021-08-01 09:00:00'),
        },
        {
          id: 2,
          title: 'Hamburger',
          type: 'withdraw',
          category: 'Alimentação',
          amount: 60,
          createdAt: new Date('2021-08-02 12:00:00'),
        },
      ]
    });
  },

  routes() {
    this.namespace = 'v1';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', {
        ...data,
        createdAt: new Date(),
      });
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
