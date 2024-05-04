import React from 'react'
import { Text } from '@radix-ui/themes'
import {getProfiles} from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { dataListItemPropDefs } from '@radix-ui/themes/props';
import CreateProfile from '../../pages/CreateProfile/CreateProfile.jsx';
import CreateProfile2 from '../../pages/CreateProfile/CreateProfile2.jsx';  
import CreateProfile1 from '../../pages/CreateProfile/CreateProfile.jsx';




const AllProfileInfo = () => {
  const [Profile, setProfile] = useState([null])

  useEffect(() => {

    getProfiles().then(data => {
      setProfile(data)
    }).catch(error => { 
      console.error("Failed to load profiles", error); 
    });
  }, []);

  return (
    <>
    <Text>{Profile.email}</Text>
    <Text>{Profile.linkedinUrl}</Text>
    <Text>{Profile.connectionInterest}</Text>
    <Text>{Profile.industryInterests}</Text>
    <Text>{Profile.reasOfResponsibility}</Text>
    <Text>{Profile.employmentHistory}</Text>
    <Text>{Profile.hasIdea}</Text>
    <Text>{Profile.interestedInBeingACofounder}</Text>
    <Text>{Profile.potentialIdeas}</Text>
    <Text>{Profile.previousEducation}</Text>
    <Text>{Profile.currentSchool}</Text>
    <Text>{Profile.lastSeen}</Text>
    <Text>{Profile.updatedAt}</Text>
    <Text>{Profile.createdAt}</Text>
    <></>
      
    </>
  );
}

export default AllProfileInfo;
