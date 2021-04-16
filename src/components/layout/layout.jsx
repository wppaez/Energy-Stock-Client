import React from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import { Controls } from '../forms/controls/controls';

export const Layout = () => {
  return (
    <HStack h="100vh" fontSize="xl" bg="#f0f0f0" spacing={0}>
      <Controls />
      <VStack bg="#CCCCCC" m={0} minH="100vh" flex="1"></VStack>
    </HStack>
  );
};
