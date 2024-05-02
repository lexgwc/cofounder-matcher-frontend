import React, {  useState, useEffect } from 'react';
import Filters from '../../components/filters/filters.jsx';
import { Avatar, Grid, Button, Text, Card } from 
'@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import { getUserById } from '../../services/apiServices.js';


const ProfileSearch = () => {
  const [profile, setProfile] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  

  const loadProfile = async () => {
    try {
    const newProfile = await getUserById(1)
    setProfile(newProfile);
  } catch (error) {
  console.log("Error loading profile", error)  
    }
  };

  const addToFavorites = () => {
    if (profile && !favorites.find(fav => fav.id === profile.id)) {
      const newFavorites = [...favorites, profile];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      console.log("No profile to add or profile already exists in favorites.");
    }
  };

useEffect(() => { 

  loadProfile();
  }, []);

  return (

    <>
<Filters />
      <Grid columns={3} rows={4} tyle={{ gap: '20px', marginBottom: '20px' }}>
      {/* <Avatar>src={ avatar } </Avatar> */}
      <Card style={{ display: 'flex', 
          flexDirection: 'column',
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          margin: '20px', 
          padding: '20px',
          width: '100%'}}>Profile Card
      <br/><br/><Avatar>picture</Avatar>
      <Button style={{ marginLeft: 'auto' }}onClick={addToFavorites}>⭐</Button>
      <br/><br/><Text>Profile Name</Text><br/>
        <Text>School</Text>
      </Card>
      <Text style={{ margin: '20px' }}>All Profile Information</Text>
      <Button>Skip for now</Button><br/><br/>
      <Button><NavLink to='/conversation'>Message</NavLink></Button>
      </Grid>
    </>
  );
};

export default ProfileSearch;
