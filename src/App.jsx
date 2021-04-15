import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Layout } from './components/layout/layout';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout />
    </ChakraProvider>
  );
}

export default App;
