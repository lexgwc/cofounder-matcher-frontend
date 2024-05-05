import React from 'react';
import { Card, Text, Button, Avatar, Box } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { createFavorite, getSchoolById } from '../../services/apiServices.js';


const ProfileCard = ({ profile }) => { 
  const [ favoriteStatus, setFavoriteStatus ] = useState(false)
  const [schoolName, setSchoolName] = useState('')

  useEffect(() => {
    const fetchSchoolName = async () => {
      if (profile && profile.currentSchool) {
        try {
          const response = await getSchoolById(profile.currentSchool);
          console.log("School name response:", response);
          setSchoolName(response.data.name);
          console.log("School name:", schoolName);
        } catch (error) {
          console.error("Failed to fetch school name:", error);
          setSchoolName('Unknown School');
        }
      }
    };

    fetchSchoolName();
  }, [profile]);


  const addToFavorites = async () => {
    try {
      await createFavorite({profileId: profile._id});
      console.log("Added to favorites:", profile);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  if (!profile) {
    return <Card style={{ margin: '15px', padding: '20px' }}>Loading profile...</Card>;
  }

  return (
    <Box>
    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', margin: '15px', padding: '20px', width: '100%' }}>
      <Avatar src={profile.profilePicture} alt={profile && profile.profilePicture} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <Text>{profile.fullName}</Text><br/>
      <Button onClick={addToFavorites}>⭐</Button>
      <Text>{schoolName}</Text>
      <Text>{profile.programType}</Text>
    </Card>
    <></>
    </Box>
  )
}

export default ProfileCard;
