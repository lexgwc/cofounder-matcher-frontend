import React from 'react'
import { createProfile } from '../../services/apiServices.js'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Flex, Button, Avatar, Heading, Text, TextField, DropdownMenu, ScrollArea, Progress, Box } from '@radix-ui/themes'

const CreateProfile = () => {

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    currentSchool: '',
    aboutMe: '',
    socialMedia: {
      linkedInURL: '',
    },
    email: '',
    schedulingURL: '',
    profilePicture: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    // if (e.target.name === 'linkedInUrl') {
    //   setProfileData({...profileData, socialMedia['linkedInUrl']: e.target.value})
    // }
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileData);
    try {
      const apiResponse = await createProfile(profileData);
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.error);
      }
      navigate('/create-profile1');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Heading>Create Profile</Heading>
      <Box maxWidth="300px">
        <Progress value={33}/>
      </Box>
      <br/>
      <Text size="5">Basic Information</Text>
      <input type="file"  accept="image/*" />
      <br/>
      <Text>Add a profile picture</Text>
      
      
      <form onSubmit={handleSubmit}>
        
        <br/>
        {/* First Name */}
        <label htmlFor="firstName">First name:</label>
        <br/>
        <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange}
        />
        <br/>

        {/* Last Name */}
        <label htmlFor="lastName">Last name:</label>
        <br/>
        <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange}/>
        <br/>

        {/* Date of Birth */}
        <label htmlFor="birthdate">Birthdate:</label>
        <br/>
        <input type="date" id="birthDate" name="birthDate" value={profileData.birthDate} onChange={handleChange}/>
        <br/>

        {/* School */}
        <label htmlFor="currentSchool">School:</label>
        <br/>
        <select id="currentSchool" name="currentSchool" value={profileData.currentSchool} onChange={handleChange}>
        <option value="">Select School</option>
        </select>
        <br/>


        {/* About Me */}
        <label htmlFor="aboutMe">About me:</label>
        <br/>
        <input type="text" id="aboutMe" name="aboutMe" value={profileData.about} onChange={handleChange}/>
        <br/>

        {/* Linkedin */}
        <label htmlFor="linkedInURL">LinkedIn URL:</label>
        <br/>
        <input type="string" id="linkedInURL" name="linkedInURL" value={profileData.linkedInURL} onChange={handleChange}/>
        <br/>

        {/* Email */}
        <label htmlFor="email">Email:</label>
        <br/>
        <input type="email" id="email" name="email" value={profileData.email} onChange={handleChange}/>
        <br/>

        {/* Scheduling URL */}
        <label htmlFor="schedulingURL">Scheduling Link:</label>
        <br/>
        <input type="string" id="schedulingURL" name="schedulingURL" value={profileData.schedulingURL} onChange={handleChange}/>
        <br/>

        {/*Submit Button*/}
        <Button type="submit">Save and Continue</Button>
        <br/>

      </form>
    </>
  )
}

export default CreateProfile
