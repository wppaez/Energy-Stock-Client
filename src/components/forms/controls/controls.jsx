import React, { useState } from 'react';
import { Center, Code, HStack, Spacer, Text, VStack } from '@chakra-ui/layout';
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { BiFilterAlt } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
export const Controls = () => {
  const [model, setModel] = useState(() => 'Seleccione su modelo');

  return (
    <VStack spacing="24px" pt="8">
      <Center>
        <Menu placement="bottom" matchWidth>
          <MenuButton
            as={Button}
            rightIcon={<Icon as={FaChevronDown} w={6} h={6} />}
            bg="transparent"
          >
            <HStack>
              <Icon as={BiFilterAlt} w={6} h={6} />
              <Text fontSize="2xl">{model}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setModel('Seleccione su modelo')}>
              Seleccione su modelo
            </MenuItem>
            <MenuItem onClick={() => setModel('Exponencial Doble')}>
              Exponencial Doble
            </MenuItem>
          </MenuList>
        </Menu>
      </Center>
    </VStack>
  );
};
