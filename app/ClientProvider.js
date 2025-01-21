// components/ClientProvider.js
"use client"; // This indicates that the component is a client component

import { Provider } from 'react-redux';
import store from '../store'; // Make sure this path is correct

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
} 