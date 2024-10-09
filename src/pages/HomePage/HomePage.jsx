import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo1.png'
import { Button, Heading, Text, Flex } from '@radix-ui/themes'
import './HomePage.css'
import SchoolCount from '../../components/SchoolCount/SchoolCount.jsx'


const HomePage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
    <Flex direction='column' align='center' wrap='wrap'
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '85vw',
      maxWidth: '650px',
      textAlign: 'center'
    }}>
      <br/>
      <img src={logo} alt="Logo"style={{ width: '80px', height: 'auto', borderRadius: '30%'  }} className="logo" /><br/>

      <Heading size="8">Stanford Campus Connect</Heading><br/><br/>

      <Heading size="6">Great things happen when great minds come together.</Heading><br/>

      <Text> Whether you&apos;re looking for a cofounder for your next startup, seeking advice on your career path, or just want to connect with fellow students who share your professional interests, you&apos;ve come to the right place.</Text><br/>
      <Button className='create-account-button'> <NavLink to='/create-account' className='create-account-navlink'>Create an Account </NavLink></Button><br/>
      <Text>Already have an account? <NavLink to='/login'>  Login</NavLink></Text><br/>
      <Heading size="6">Join the community</Heading><br/>
      <Text>Current Users at Stanford:</Text>
      <br/>
      <SchoolCount/>
      <Text as="p" style={{ color: 'gray', fontSize: '0.8em', marginTop: '10px', fontStyle: 'italic'}}>*Disclaimer: Please note that this is an independent student-run app and not an official Stanford University product.
      </Text><br/>
    </Flex>
    </div>
  )}
export default HomePage
