import { VStack } from '@chakra-ui/layout';
import React, { useEffect } from 'react';

export const Statistics = ({ stats }) => {
  useEffect(() => {
    console.log(stats);
  }, [stats]);
  return <VStack bg="#CCCCCC" m={0} minH="100vh" flex="1"></VStack>;
};
