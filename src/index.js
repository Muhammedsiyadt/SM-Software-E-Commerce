import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './app/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { theme } from './utils/theme.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='701361662165-cljf9v9gtmjf75hq1muviu7almlvfe4t.apps.googleusercontent.com'>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

