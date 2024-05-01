import React from 'react'
import Filters from '../../components/filters/filters.jsx'
import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.png'
import { Button, Heading, Text, Box} from '@radix-ui/themes'
import './HomePage.css'
import SchoolCount from '../../components/SchoolCount/SchoolCount.jsx'


const HomePage = () => {
  return (
    <Box>
      {/* <img src={logo} alt="Logo" className="logo" /> */}
      <Heading>Find the Right Connections</Heading>
      <Heading>Change The World</Heading>
      <Button> <NavLink to='/create-account'>Create an Account</NavLink></Button>
      <Text>Already have an account? <NavLink to='/login'>Login</NavLink></Text>
      <SchoolCount/>
      <SchoolCount/>
    </Box>
  
 
  )}
export default HomePage
