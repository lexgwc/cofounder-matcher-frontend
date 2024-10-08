import { Card, Text, Button, Avatar, Box, Flex, Heading } from '@radix-ui/themes';
import { useState, useEffect, useCallback } from 'react';
import { createFavorite, getSchoolById, deleteFavoriteById, getAllFavoritesByUserId } from '../../services/apiServices.js';
import { StarIconEmpty, StarIconFilled } from '../StarIcons/StarIcons.jsx';
import { useNavigate } from 'react-router';

const ProfileCard = ({ profile }) => {
  const [favoriteStatus, setFavoriteStatus] = useState(false)
  const [favoriteId, setFavoriteId] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const navigate = useNavigate()

  const addToFavorites = useCallback(async () => {
    try {
      const newFavorite = await createFavorite({ profileId: profile._id });
      if (newFavorite && newFavorite.data) {
        console.log(newFavorite.data._id)
        setFavoriteStatus(true)
        setFavoriteId(newFavorite.data._id)
        console.log(`This is the new favorite ID : ${favoriteId}`)
        console.log("Added to favorites:", profile);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  }, [profile])

  const removeFromFavorites = useCallback(async () => {
    if (!favoriteId) return
    try {
      await deleteFavoriteById(favoriteId)
      setFavoriteStatus(false)
      setFavoriteId('')
      console.log("Removed from favorites:", profile);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  }, [favoriteId, profile])

  const handleViewProfile = () => {
    navigate(`/view-profile/${profile._id}`)
  }

  useEffect(() => {
    const fetchSchoolName = async () => {
      if (profile && profile.currentSchool) {
        try {
          const response = await getSchoolById(profile.currentSchool);
          console.log("School name response:", response);
          setSchoolName(response.data.name || 'Unknown school');
          console.log("School name:", schoolName);
        } catch (error) {
          console.error("Failed to fetch school name:", error);
          setSchoolName('Unknown School');
        }
      }
    };
    const fetchFavoriteStatus = async () => {
      const favoritesArray = await getAllFavoritesByUserId()
      console.log(favoritesArray.data)
      const favorite = favoritesArray.data.find(favorite => (
        favorite.favoritedProfile === profile._id
      ))
      if (favorite) {
        setFavoriteStatus(true)
        setFavoriteId(favorite._id)
      } else {
        setFavoriteStatus(false)
        setFavoriteId('')
      }
    }
    fetchSchoolName()
    fetchFavoriteStatus()
  }, [profile])

  if (!profile) {
    return <Card style={{ margin: '15px', padding: '20px' }}>Loading profile...</Card>;
  }

  return (
  //   <Box style={{ marginBottom: '20px', width: '90vw', maxWidth: '800px' }}>
  //   <Flex align="center" justify="space-between">
  //     <Flex gap="3" align="center" style={{ flex: 1 }}>
  //       <Avatar
  //         size="3"
  //         src={profile.profilePicture}
  //         alt={profile?.profilePicture || 'Profile Picture'} // Fallback alt text
  //         radius="full"
  //         fallback=""
  //       />
  //       <Box>
  //         <Heading onClick={handleViewProfile} className='profile-full-name'>
  //           {profile.fullName || `${profile.firstName} ${profile.lastName}`}
  //         </Heading>
  //         <Text as="div" size="2" color="gray">
  //           {profile.programType}
  //         </Text>
  //       </Box>
  //     </Flex>
  //     <Button onClick={favoriteStatus ? removeFromFavorites : addToFavorites}>
  //       {favoriteStatus ? <StarIconFilled /> : <StarIconEmpty />}
  //     </Button>
  //   </Flex>
  // </Box>

  //V2
//   <Box style={{ marginBottom: '20px', width: '90vw', maxWidth: '800px', textAlign: 'center' }}>
//   <Flex direction="column" align="center" justify="center">
//     <Heading onClick={handleViewProfile} className='profile-full-name' style={{ marginBottom: '8px' }}>
//       {profile.fullName || `${profile.firstName} ${profile.lastName}`}
//     </Heading>
//     <Text as="div" size="2" color="gray" style={{ marginBottom: '16px' }}>
//       {profile.programType}
//     </Text>
//     <Avatar
//       size="5" // Increased size for larger avatar
//       src={profile.profilePicture}
//       alt={profile?.profilePicture || 'Profile Picture'}
//       radius="full"
//       fallback=""
//       style={{ margin: '0 auto' }} // Center avatar
//     />
//     <Button onClick={favoriteStatus ? removeFromFavorites : addToFavorites} style={{ marginTop: '12px' }}>
//       {favoriteStatus ? <StarIconFilled /> : <StarIconEmpty />}
//     </Button>
//   </Flex>
// </Box>
//   )

<Box style={{ marginBottom: '20px', width: '100%', maxWidth: '800px', textAlign: 'center', margin: '0 auto' }}>
  <Flex direction="column" align="center" justify="center">
    <Heading onClick={handleViewProfile} className='profile-full-name' style={{ marginBottom: '8px' }}>
      {profile.fullName || `${profile.firstName} ${profile.lastName}`}
    </Heading>
    <Text as="div" size="2" color="gray" style={{ marginBottom: '16px' }}>
      {profile.programType}
    </Text>
    <Avatar
      size="5" 
      src={profile.profilePicture}
      alt={profile?.profilePicture || 'Profile Picture'}
      radius="full"
      fallback=""
      style={{ margin: '0 auto' }} 
    />
    <Button onClick={favoriteStatus ? removeFromFavorites : addToFavorites} style={{
          position: 'absolute',
          top: '20px',
          right: '20px'
        }}>
      {favoriteStatus ? <StarIconFilled /> : <StarIconEmpty />}
    </Button>
  </Flex>
</Box>
  )
}

export default ProfileCard;
