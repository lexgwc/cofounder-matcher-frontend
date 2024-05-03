import React from 'react'
import { updateProfileByUserId, getProgramTypes, getSchools, getAreasOfResponsibility, getHasIdea, getIndustryInterests } from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './EditProfile.css'

import { Flex, Button, Heading, Text, Progress, TextField, Box, Select, ScrollArea, CheckboxGroup } from '@radix-ui/themes'

const EditProfile = () => {

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    currentSchool: '',
    aboutMe: '',
    linkedinUrl: '',
    email: '',
    schedulingUrl: '',
    profilePicture: '',
    previousEducation: '',
    programType: '',
    employmentHistory: '',
    technical: '',
    impressiveAccomplishmnet: '',
    interestedInBeingACofounder: '',
    connectionInterest: '',
    industryInterests: [],
    areasOfResponsibility: [],
    hasIdea: '',
    potentialIdeas: '',
    cofounderDesiredQualities: ''

  })

  const [hasIdea, setHasIdea] = useState([])
  const [industryInterests, setIndustryInterests] = useState([])
  const [areasOfResponsibility, setAreasOfResponsibility] = useState([])
  const [programTypes, setProgramTypes] = useState([])
  const [schools, setSchools] = useState([])
  const navigate = useNavigate()




  useEffect(() => {
    const fetchData = async () => {
      try {
        // Execute all API calls concurrently
        const [ hasIdea, industryInterests, areasOfResponsibility, programTypes, schools] = await Promise.all([
          getHasIdea(),
          getIndustryInterests(),
          getAreasOfResponsibility(),
          getProgramTypes(),
          getSchools()
        ]);

        console.log('Idea Response:', hasIdea);
        console.log('Industry Response:', industryInterests);
        console.log('Areas Response:', areasOfResponsibility);
        console.log('Program Types:', programTypes);
        console.log('Schools:', schools);
  

        // Check and set hasIdea
        if (hasIdea && Array.isArray(hasIdea.data)) {
          setHasIdea(hasIdea.data);
        } else {
          console.error('Expected hasIdea.data to be an array, got:', hasIdea.data);
        }

        // Check and set industry interests
        if (industryInterests && Array.isArray(industryInterests.data)) {
          setIndustryInterests(industryInterests.data);
        } else {
          console.error('Expected industryInterests.data to be an array, got:', industryInterests.data);
        }

        // Check and set areas of responsibility
        if (areasOfResponsibility && Array.isArray(areasOfResponsibility.data)) {
          setAreasOfResponsibility(areasOfResponsibility.data);
        } else {
          console.error('Expected areasOfResponsibility.data to be an array, got:', areasOfResponsibility.data);
        }

        // Check and set program types
        if (programTypes && Array.isArray(programTypes.data)) {
          setProgramTypes(programTypes.data);
        } else {
          console.error('Expected programTypes.data to be an array, got:', programTypes.data);
        }

        // Check and set schools
        if (schools && Array.isArray(schools.data)) {
          setSchools(schools.data);
        } else {
          console.error('Expected schools.data to be an array, got:', schools.data);
        }

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [navigate]); 

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

    try {
      const apiResponse = await updateProfileByUserId(userId, profileData);
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.error);
      }
      navigate('/profile-search');
    } catch (error) {
      console.error(error);
    }
  }
  



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
      <Box display="block" style={{ justifyContent: 'center', position: 'fixed', top: 0, zIndex: 1000, backgroundColor: 'rgba(17,17,17)', width: '100%',paddingTop: 50, paddingBottom: 10 }}>
        <>
          <Heading >Edit Profile</Heading>
          <Box maxWidth="300px">
            <Progress/>
          </Box>
        </>
      </Box>
      
    <form onSubmit={handleSubmit} style={{ marginTop: '80px' }}>
        
        <br/>
        {/* First Name */}
        <label htmlFor="firstName">First name:</label>
        <br/>
        <TextField.Root id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} placeholder="First Name">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Last Name */}
        <label htmlFor="lastName">Last name:</label>
        <br/>
        <TextField.Root id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} placeholder="Last Name">
          <TextField.Slot/>
        </TextField.Root>
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
        {schools.map(school => (
              <option key={school._id} value={school._id}>{school.name}</option>
            ))}
        </select>
        <br/>


        {/* About Me */}
        <label htmlFor="aboutMe">About me:</label>
        <br/>
        <TextField.Root id="aboutMe" name="aboutMe" value={profileData.aboutMe} onChange={handleChange} placeholder="Tell us about your background, interests, career, and what you're looking for on this app">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Linkedin */}
        <label htmlFor="linkedinUrl">What's your LinkedIn URL?</label>
        <br/>
        <TextField.Root id="linkedinUrl" name="linkedinUrl" value={profileData.linkedinUrl} onChange={handleChange} placeholder="Linkedin URL">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Email */}
        <label htmlFor="email">Email:</label>
        <br/>
        <TextField.Root id="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Scheduling URL */}
        <label htmlFor="schedulingUrl">Scheduling Link:</label>
        <br/>
        <TextField.Root id="schedulingUrl" name="schedulingUrl" value={profileData.schedulingUrl} onChange={handleChange} placeholder="schedulingUrl">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        <br/>
        {/* ProgramType */}
        <label htmlFor="programType">What type of program are you currently in?</label>
        <br/>
        <select id="programType" name="programType" value={profileData.programType} onChange={handleChange}>
          <option value="">Select Program Type</option>
          {programTypes.map(programType => (
            <option key={programType} value={programType}>{programType}</option>
          ))}
        </select>
        <br/>

        {/* Previous Education */}
        <label htmlFor="previousEducation">Education History:</label>
        <br/>
        <input type="text" id="previousEducation" name="previousEducation" value={profileData.previousEducation} onChange={handleChange}/>
        <br/>

        {/* Employment History */}
        <label htmlFor="employmentHistory">Employment History:</label>
        <br/>
        <input type="text" id="employmentHistory" name="employmentHistory" value={profileData.employmentHistory} onChange={handleChange}/>
        <br/>

        {/* Technical */}
        <label htmlFor="technical">Are you technical?</label>
        <br/>
        <select id="technical" name="technical" value={profileData.technical} onChange={handleChange}>
        <option value="true">Yes</option>
        <option value="false">No</option>
        </select>
        <br/>

        {/* Impressive Acomplishment */}
        <label htmlFor="impressiveAccomplishmnet">Brag About an Impressive Accomplishment:</label>
        <br/>
        <input type="text" id="impressiveAccomplishmnet" name="impressiveAccomplishmnet" value={profileData.impressiveAccomplishmnet} onChange={handleChange}/>
        <br/>

        {/* Connection Interests */}
        <label htmlFor="connectionInterest">What kinds of connections are you looking for on this app?</label>
        <br/>
        <TextField.Root id="connectionInterest" name="connectionInterest" value={profileData.connectionInterest} onChange={handleChange} placeholder="e.g. I'm looking to meet a technical cofounder for a business venture in the healthcare space">
          <TextField.Slot/>
        </TextField.Root>
        <br/>


        {/* Interest in Being Cofounder */}
        <label htmlFor="interestedInBeingACofounder">Are you interested in starting a business or finding a cofounder?</label>
        <br/>
        <>
        <Select.Root id="interestedInBeingACofounder" 
        name="interestedInBeingACofounder" 
        value={profileData.interestedInBeingACofounder} 
        onValueChange={(value) => handleChange({ target: { name: 'interestedInBeingACofounder', value } })}>
          <Select.Trigger />
          <Select.Content>
              <Select.Item value="true">Yes</Select.Item>
              <Select.Item value="false">No</Select.Item>
          </Select.Content>
        </Select.Root>
        </>
        <br/>



        <br/>

        {/* Industry Interests */}
        <label htmlFor="industryInterests">What industries are you interested in?</label>
        <br/>
        <br/>
        <ScrollArea type="always" scrollbars="vertical" style={{ height: 140 }}>
          <CheckboxGroup.Root 
          name="industryInterests"
          value={profileData.industryInterests}
          id="checkbox-grid"
          onValueChange={values => handleChange({ target: { name: 'industryInterests', value: values } })} >
            {industryInterests.map(industry => (
              <CheckboxGroup.Item key={industry} value={industry}>
                {industry}
              </CheckboxGroup.Item>
            ))}
          </CheckboxGroup.Root>
        </ScrollArea>
        <br/>

        {/* Areas of Responsibility */}
        <label htmlFor="areasOfResponsibility">What skills do you have?</label>
        <br/>
        <br/>
          <CheckboxGroup.Root 
          name="areasOfResponsibility"
          value={profileData.areasOfResponsibility}
          id="checkbox-grid"
          onValueChange={values => handleChange({ target: { name: 'areasOfResponsibility', value: values } })} >
            {areasOfResponsibility.map(area => (
              <CheckboxGroup.Item key={area} value={area}>
                {area}
              </CheckboxGroup.Item>
            ))}
          </CheckboxGroup.Root>
        <br/>

        {/* HasIdea */}
        <label htmlFor="hasIdea">Do you have a business idea you want to work on?</label>
        <br/>
        <select id="hasIdea" name="hasIdea" value={profileData.hasIdea} onChange={handleChange}>
        <option value="">Select Idea Status</option>
          {hasIdea.map(idea => (
            <option key={idea} value={idea}>{idea}</option>
          ))}
        </select>
        <br/>
        <br/>

        {/* Potential Ideas */}
        <label htmlFor="potentialIdeas">If you have any business ideas, what are some you might like to work on?</label>
        <br/>
        <TextField.Root id="potentialIdeas" name="potentialIdeas" value={profileData.potentialIdeas} onChange={handleChange} placeholder="e.g. I have an idea for a mobile app that helps people find the best local restaurants">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Cofounder Desired Qualities */}
        <label htmlFor="cofounderDesiredQualities">What qualities are you looking for in a cofounder?</label>
        <br/>
        <TextField.Root id="cofounderDesiredQualities" name="cofounderDesiredQualities" value={profileData.cofounderDesiredQualities} onChange={handleChange} placeholder="e.g. I'm looking for someone who is passionate about technology and has experience in marketing">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/*Submit Button*/}
        <Button type="submit">Save</Button>

    </form>
    </Flex>

    </>
  );
}

export default EditProfile