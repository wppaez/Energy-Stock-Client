import React, { useState } from 'react';
import { HStack } from '@chakra-ui/react';
import { Controls } from '../forms/controls/controls';
import { Statistics } from '../statistics/statistics';

export const Layout = () => {
  const [stats, setStats] = useState(null);
  return (
    <HStack h="100vh" fontSize="xl" bg="#f0f0f0" spacing={0}>
      <Controls onSubmit={data => setStats(data)} />
      <Statistics stats={stats} />
    </HStack>
  );
};
