import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Controls } from '../forms/controls/controls';

export const Layout = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" templateColumns="repeat(12, 1fr)">
        <GridItem colSart={1} colSpan={4} h="100vh" bg="#626D71">
          <Controls />
        </GridItem>
        <GridItem colStart={5} colSpan={8} h="100vh" bg="#EDEDED"></GridItem>
      </Grid>
    </Box>
  );
};
