import React from 'react'
import { createProfile, getSchools } from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './CreateProfile.css'

import { Flex, Button, Heading, Text, Progress, Box, TextField } from '@radix-ui/themes'

const CreateProfile = () => {

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;
  
  const [profileData, setProfileData] = useState({
    userId: userId,
    firstName: '',
    lastName: '',
    birthDate: '',
    currentSchool: '',
    aboutMe: '',
    linkedinUrl: '',
    email: '',
    schedulingUrl: '',
    profilePicture: ''
  })

  const [schools, setSchools] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSchools();
        console.log("Fetched schools data:", response); // Debug: Check the structure of the returned data
        if (response && Array.isArray(response.data)) { // Ensure there's a 'data' property and it's an array
          setSchools(response.data);
        } else {
          console.error('Expected response.data to be an array, got:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch schools:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileData);

    const formData = new FormData();
    Object.keys(profileData).forEach(key => {
        formData.append(key, profileData[key]);
      });
    if (profileData.profilePicture) {
      formData.append('profilePicture', profileData.profilePicture);
    }

    // let object = {};
    // formData.forEach((value, key) => {
    // object[key] = value;
    // });
    // const json = JSON.stringify(object)
    // console.log(json)

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

  const handleFileChange = (e) => {
    setProfileData({
      ...profileData,
      profilePicture: e.target.files[0]
    });
  };

  return (
    <>
    <Flex direction="column" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center'
      }}>
      <Box display="block" style={{ justifyContent: 'center', position: 'fixed', top: 0, zIndex: 1000, backgroundColor: 'rgba(17,17,17)', width: '100%',paddingTop: 50, paddingBottom: 0 }}>
        <>
          <Heading >Create Profile</Heading>
          <br/>
          <Text size="5">Basic Information</Text>
          <br/>
          <Box maxWidth="300px">
            <Progress value={33}/>
          </Box>
          <br/>
        </>
      </Box>
      
      
      <form onSubmit={handleSubmit} style={{ marginTop: '180px' }}>
        
        {/* Profile Picture */}
        <Text>Add a profile picture</Text>
          <input type="file"  accept="image/*" />
          <br/>
        
        <br/>
        {/* First Name */}
        <Text htmlFor="firstName">First name</Text>
        <br/>
        <TextField.Root id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} placeholder="First Name">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Last Name */}
        <Text htmlFor="lastName">Last name</Text>
        <br/>
        <TextField.Root id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} placeholder="Last Name">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Date of Birth */}
        <Text htmlFor="birthdate">Birthdate</Text>
        <br/>
        <input type="date" id="birthDate" name="birthDate" value={profileData.birthDate} onChange={handleChange}/>
        <br/>
        <br/>

        {/* School */}
        <Text htmlFor="currentSchool">Current school</Text>
        <br/>
        <select id="currentSchool" name="currentSchool" value={profileData.currentSchool} onChange={handleChange}>
        <option value="">Select School</option>
        {schools.map(school => (
              <option key={school._id} value={school._id}>{school.name}</option>
            ))}
        </select>
        <br/>
        <br/>


        {/* About Me */}
        <Text htmlFor="aboutMe">About me</Text>
        <br/>
        <TextField.Root id="aboutMe" name="aboutMe" value={profileData.aboutMe} onChange={handleChange} placeholder="Tell us about your background, interests, career, and what you're looking for on this app">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Linkedin */}
        <Text htmlFor="linkedinUrl">LinkedIn URL</Text>
        <br/>
        <TextField.Root id="linkedinUrl" name="linkedinUrl" value={profileData.linkedinUrl} onChange={handleChange} placeholder="Linkedin URL">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Email */}
        <Text htmlFor="email">Email</Text>
        <br/>
        <TextField.Root id="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Scheduling URL */}
        <Text htmlFor="schedulingUrl">Scheduling URL</Text>
        <br/>
        <TextField.Root id="schedulingUrl" name="schedulingUrl" value={profileData.schedulingUrl} onChange={handleChange} placeholder="Scheduling URL">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/*Submit Button*/}
        <Button type="submit">Save and Continue</Button>
        <br/>

      </form>
      </Flex>
    </>
  )
}

export default CreateProfile
