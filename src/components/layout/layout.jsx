import React from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import { Controls } from '../forms/controls/controls';

export const Layout = () => {
  return (
    <HStack h="100vh" fontSize="xl" bg="#f0f0f0">
      <Controls />
      <VStack bg="#CCCCCC" minW="calc(100% - 453.953px)" minH="100vh"></VStack>
    </HStack>
  );
};
