import React, { useState } from 'react';
import './filters.css';
import { CheckboxGroup, DropdownMenu, Button, Flex } from '@radix-ui/themes'
import {getSchools} from '../../services/apiServices.js';
import {getSchoolById} from '../../services/apiServices.js';
import { getProgramTypes } from '../../services/apiServices.js';



const Filters = ({ setFilters }) => {

  const handleSchoolChange = (School) => {
    setFilters(filters => ({ ...filters, School }));
  };

  const handleProgramChange = (Program) => {
    setFilters(filters => ({ ...filters, Program }));
  };

  const handleTechnicalChange = (event) => {
    setFilters(filters => ({ ...filters, Technical: event.target.checked }));
  };

  
  return(
    <>
      <div>Filters</div>

      <Flex gap="3" direction="row" wrap="wrap" asChild>
        <div>

          {/* Schools Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="soft">
                School
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onSelect={() => handleSchoolChange('Harvard')}>Harvard</DropdownMenu.Item>
              <DropdownMenu.Item onSelect={() => handleSchoolChange('Stanford')}>Stanford</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Programs Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="soft">
                Program
                <DropdownMenu.TriggerIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item onSelect={() => handleProgramChange('Law')}>Law</DropdownMenu.Item>
              <DropdownMenu.Item onSelect ={()=> handleProgramChange('Business')}>Business</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Technical */}
          <CheckboxGroup.Root defaultValue={['1']} name="technical">
            <CheckboxGroup.Item value="1" onCheckedChange={handleTechnicalChange}>Technical</CheckboxGroup.Item>
          </CheckboxGroup.Root>
          
        </div>
      </Flex>
    </>
  )
}
export default Filters;

// const filtersObj = {
//   currentSchool: '',
//   programTypes: '',
//   technical: null
// }

// const query = {}

// const filtersToSend = Object.entries(filtersObj).map(([key, value]) => {
//   if (value) {
//     query.key = value
//   }
//   return null;
// })

// query = { currentSchool: 'Harvard' }