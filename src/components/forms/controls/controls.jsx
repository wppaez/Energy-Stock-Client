import React, { useState } from 'react';
import { HStack, Text, VStack } from '@chakra-ui/layout';
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { BiStats, BiFilterAlt, BiCalendarEvent } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MODELS, VARIABLES } from '../../../shared/common';
import './controls.css';

const getCurrentTime = (offset = false) => {
  const d = new Date();
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  if (offset) return new Date(d.getTime() + 24 * 60 * 60 * 1000);
  return d;
};

const formatDate = (date, format = 'yyyy-MM-dd') => {
  try {
    const years = date.getFullYear().toString();
    const months = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return format
      .replace('yyyy', years)
      .replace('MM', months)
      .replace('dd', day);
  } catch (error) {
    return 'Sin seleccionar';
  }
};

export const Controls = ({ onSubmit }) => {
  const [variable, setVariable] = useState(() => VARIABLES[0]);
  const [model, setModel] = useState(() => MODELS[0].name);
  const [start, setStart] = useState(() => getCurrentTime());
  const [end, setEnd] = useState(() => getCurrentTime(true));
  const minDate = getCurrentTime();

  const variableIsSelected = variable !== VARIABLES[0];

  function modelVariableFilter(filterVariable) {
    return MODELS.filter(m => m.variable === filterVariable);
  }

  function handleVariableChange(value) {
    const modelsFiltered = modelVariableFilter(value).map(m => m.name);
    const isCurrentModelIncluded = modelsFiltered.includes(model);
    setVariable(value);
    if (!isCurrentModelIncluded) setModel(modelsFiltered[0]);
  }

  function hanldeDatePickerChange(dates) {
    let [startUpdate, endUpdate] = dates;
    setStart(startUpdate);
    setEnd(endUpdate);
  }

  function handleSubmit() {
    onSubmit(model, [start, end]);
  }

  function renderVariables() {
    return VARIABLES.map(value => (
      <MenuItem key={value} onClick={() => handleVariableChange(value)}>
        {value}
      </MenuItem>
    ));
  }

  function renderModels() {
    return modelVariableFilter(variable).map(m => (
      <MenuItem key={m.name} onClick={() => setModel(m.name)}>
        {m.name}
      </MenuItem>
    ));
  }

  return (
    <VStack
      spacing="24px"
      pt="8"
      pl="4"
      pr="4"
      alignItems="flex-start"
      maxW="453.953px"
    >
      {/* Variable selector */}
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<Icon as={FaChevronDown} w={4} h={4} />}
          bg="transparent"
          className="fw-regular"
          _hover={{ bg: '#1d5d90', color: '#FFFFFF' }}
          _active={{ bg: '#1d5d90', color: '#FFFFFF' }}
        >
          <HStack>
            <Icon as={BiStats} w={6} h={6} />
            <Text fontSize="2xl">{variable}</Text>
          </HStack>
        </MenuButton>
        <MenuList zIndex={2}>{renderVariables()}</MenuList>
      </Menu>
      {variableIsSelected ? (
        <>
          {/* Model selector */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<Icon as={FaChevronDown} w={4} h={4} />}
              bg="transparent"
              className="fw-regular"
              _hover={{ bg: '#1d5d90', color: '#FFFFFF' }}
              _active={{ bg: '#1d5d90', color: '#FFFFFF' }}
            >
              <HStack>
                <Icon as={BiFilterAlt} w={6} h={6} />
                <Text fontSize="2xl">{model}</Text>
              </HStack>
            </MenuButton>
            <MenuList zIndex={2}>{renderModels()}</MenuList>
          </Menu>

          {/* Ranged date */}
          <HStack width="100%" justify="space-between">
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={start}
              startDate={start}
              endDate={end}
              minDate={minDate}
              className="date-picker"
              onChange={hanldeDatePickerChange}
              selectsRange
              inline
            />
            <VStack alignItems="flex-start">
              <HStack pl="4">
                <Icon as={BiCalendarEvent} w={6} h={6} />
                <Text fontSize="2xl">Fecha inicio</Text>
              </HStack>
              <HStack width="100%">
                <Text fontSize="lg" align="right" width="100%">
                  {formatDate(start)}
                </Text>
              </HStack>
              <HStack pl="4">
                <Icon as={BiCalendarEvent} w={6} h={6} />
                <Text fontSize="2xl">Fecha Fin</Text>
              </HStack>
              <HStack width="100%">
                <Text fontSize="lg" align="right" width="100%">
                  {formatDate(end)}
                </Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Submit */}
          <Button
            variant="outline"
            className="b-primary"
            disabled={end ? false : true}
            onClick={() => handleSubmit()}
            _hover={{ bg: '#1d5d90', color: '#FFFFFF' }}
            _active={{ bg: '#1d5d90', color: '#FFFFFF' }}
            isFullWidth
          >
            Consultar
          </Button>

          {/* Info */}
          {end ? null : (
            <Text fontSize="sm" align="left" width="100%">
              * Debe tener todos los campos debidamente diligenciados.
            </Text>
          )}
        </>
      ) : null}
    </VStack>
  );
};
