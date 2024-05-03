import React, { useState, useEffect } from 'react';
import Filters from '../../components/filters/filters.jsx';
import { Avatar, Grid, Button, Text, Card } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import { getProfiles } from '../../services/apiServices.js';
import ProfileCard from '../../components/profileCard/profileCard.jsx';
import { getSchools } from '../../services/apiServices.js';
import { getSchoolById } from '../../services/apiServices.js'; 
import { getProgramTypes } from '../../services/apiServices.js';
import EditProfile from '../EditProfile/EditProfile.jsx';



const ProfileSearch = () => {
  const [filters, setFilters] = useState({currentSchool: '', program:'', technical: false});
  const [profile, setProfile] = useState({});
  const [profileArray, setProfileArray] = useState([]);
  const [profileIndex, setProfileIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);
      console.log('Filtros aplicados:', filters);
      const profiles = await getProfiles(filters);
      if (profiles && profiles.data && profiles.data.length > 0) {
        setProfileArray(profiles.data);
        setProfile(profiles.data[0]);
        setProfileIndex(0);
        console.log(profileArray)
      } else {
        setProfileArray([]); 
      setProfile(null);
      }
      setLoading(false); 
    }
    fetchProfiles();
  }, [filters]);

  useEffect(() => {
    if (profileArray.length > 0 && profileIndex < profileArray.length) {
      setProfile(profileArray[profileIndex]);
    }
  }, [profileArray, profileIndex]);

  const handleSkip = () => {
    setProfileIndex(prevIndex => (prevIndex + 1) % profileArray.length);
  };

  console.log("Rendering with profile:", profile);

  return (
    <>
     <box>
       <Filters setFilters={setFilters} />
      
      <Grid columns={3} rows={4} style={{ gap: '20px', marginBottom: '20px' }}>
        <ProfileCard profile={profile} />
        {/* <EditProfile profile={profile}/> */}
        <Button onClick={handleSkip}>Skip for now</Button><br/><br/>
        <Button><NavLink to='/conversation'>Message</NavLink></Button>
      </Grid>

      </box>
    </>
  );
};

export default ProfileSearch;


// const filtersObj = {
//   currentSchool: '',
//   programTypes: '',
//   technical: null
// }

// const query = {}

// const filtersToSend = Object.entries(filtersObj).map(([key, value]) => {
//   if (value) {
//     query.key = value
//   }
//   return null;
// })

// query = { currentSchool: 'Harvard' }