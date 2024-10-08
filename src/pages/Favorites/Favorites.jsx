import { useState, useEffect } from 'react';
import { Box, Heading, Card } from '@radix-ui/themes';
import { getAllFavoritesByUserId, getProfileById } from '../../services/apiServices';
import ProfileCard from '../../components/profileCard/profileCard.jsx';
import Loading from '../../components/Loading/Loading.jsx';

const Favorites = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFavoritesAndProfiles = async () => {
      try {
        // First, fetch all favorites
        const response = await getAllFavoritesByUserId();
        const favoritesData = response.data;
        console.log(favoritesData);
        // Then, fetch profiles for each favorited ID
        const profilePromises = favoritesData.map(fav => getProfileById(fav.favoritedProfile));
        const profileResponses = await Promise.all(profilePromises);
        const profileData = profileResponses.map(res => res.data); // Extract just the data for each profile
        setProfiles(profileData); // Set profiles based on fetched data
      } catch (error) {
        console.error("Failed to load data", error);
        setError('Failed to load favorites or profiles');
      } finally {
        setLoading(false);
      }
    };
    fetchFavoritesAndProfiles();
  }, []);

  if (error) return <div>Error: {error}</div>;

  if (loading) return (
    <Box style={{ width: '100%', padding: '20px', textAlign: 'center' }}>
      <Heading>Favorited Profiles</Heading>
      <Loading />
    </Box>
  )

  if (profiles.length === 0) return (
    <Box style={{ width: '100%', padding: '20px', textAlign: 'center' }}>
      <Heading>Favorited Profiles</Heading>
      <div style={{ marginTop: '40px'}}>You haven&apos;t favorited any profiles.</div>
      <div style={{ marginTop: '10px'}}>You can click on Search Profiles in the menu and click on the star icons to add profiles to your favorite&apos;s.</div>
    </Box>
  )

  return (
    <Box style={{ width: '100%', padding: '20px', textAlign: 'center' }}>
      <Heading>Favorited Profiles</Heading>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '40px',
        }}
      >
        {profiles.map((profile) => (
          <Box key={profile._id} style={{ width: '100%', maxWidth: '800px' }}>
            <Card style={{paddingBottom: '20px' }}>
              <ProfileCard profile={profile} />
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Favorites;


