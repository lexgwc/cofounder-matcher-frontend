import React, { useEffect } from 'react';
import { Card, Text, Button, Avatar, Box } from '@radix-ui/themes';
import { useState } from 'react';
import { createFavorite, deleteFavoriteById, getAllFavoritesByUserId } from '../../services/apiServices.js';

const ProfileCard = ({ profile }) => { 
  const [ favoriteStatus, setFavoriteStatus ] = useState(false)
  const [ favoriteId, setFavoriteId ] = useState('')
  const [ clicked, setClicked ] = useState(1)

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const favoritesArray = await getAllFavoritesByUserId()
      favoritesArray.forEach(favorite => {
        if (favorite.profileFavorited === profile._id) {
          setFavoriteStatus(true)
          setFavoriteId(favorite._id)
        }
      })
    }
    fetchFavoriteStatus()
  },[clicked])

  const addToFavorites = async () => {
    try {
      await createFavorite({profileId: profile._id});
      console.log("Added to favorites:", profile);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      await deleteFavoriteById(favoriteId)
      console.log("Removed from favorites:", profile);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  }

  if (!profile) {
    return <Card style={{ margin: '15px', padding: '20px' }}>Loading profile...</Card>;
  }

  return (
    <Box>
    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', margin: '15px', padding: '20px', width: '100%' }}>
      Profile Card
      <br/><br/>
      <Avatar src={profile  && profile.avatar} alt={profile && profile.fullName} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <br/><br/>
      <Text>{profile.fullName}</Text><br/>
      <Button onClick={favoriteStatus === false ? addToFavorites : removeFromFavorites}>{favoriteStatus === true ? '⭐' : 'Hi'}</Button>
      <Text>{profile.aboutMe}</Text>
      <Text>{profile.programType}</Text>
      <Text>{profile.connectionInterest}</Text>
    </Card>
    <></>
    </Box>
  )
}

export default ProfileCard;
