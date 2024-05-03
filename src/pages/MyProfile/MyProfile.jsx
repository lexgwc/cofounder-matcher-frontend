import React, { useEffect, useState } from 'react';
import { getProfileByUserId } from '../../services/apiServices';
import { Box, Heading } from '@radix-ui/themes'

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
        if (!token) {
          throw new Error("Authentication token not found");
        }
        
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.userId;

        const apiResponse = await getProfileByUserId(userId);
        if (apiResponse.status !== 200) {
          throw new Error(`Failed to fetch: ${apiResponse.statusText || 'Unknown error'}`);
        }
        setProfile(apiResponse.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(profile);
  return (
    <Box>
    <Heading size={1}>Profile Details</Heading>
    <Box>
      <strong>Name:</strong>
      <p>{profile.fullName || `${profile.firstName} ${profile.lastName}`}</p>
    </Box>
    <Box>
      <strong>Email:</strong>
      <p>{profile.email}</p>
    </Box>
    <Box>
      <strong>Last Seen:</strong>
      <p>{profile.lastSeen ? new Date(profile.lastSeen).toLocaleString() : 'Unknown'}</p>
    </Box>
    <Box>
      <strong>About Me:</strong>
      <p>{profile.aboutMe || 'Not provided'}</p>
    </Box>
    <Box>
      <strong>Connection Interest:</strong>
      <p>{profile.connectionInterest || 'Not specified'}</p>
    </Box>
    <Box>
      <strong>Industry Interests:</strong>
      <p>{profile.industryInterests?.join(', ') || 'None'}</p>
    </Box>
    <Box>
      <strong>Interested in Being a Cofounder:</strong>
      <p>{profile.interestedInBeingACofounder ? 'Yes' : 'No'}</p>
    </Box>
    <Box>
      <strong>Current School:</strong>
      <p>{profile.currentSchool || 'Not provided'}</p>
    </Box>
    <Box>
      <strong>Program Type:</strong>
      <p>{profile.programType || 'Not specified'}</p>
    </Box>
    <Box>
      <strong>Birth Date:</strong>
      <p>{profile.birthDate ? new Date(profile.birthDate).toLocaleDateString() : 'Not provided'}</p>
    </Box>
    <Box>
      <strong>Profile Picture:</strong>
      <p>{profile.profilePicture ? <img src={profile.profilePicture} alt="Profile" style={{ width: 100, height: 100 }} /> : 'No image'}</p>
    </Box>
    <Box>
      <strong>Previous Education:</strong>
      <p>{profile.previousEducation || 'Not specified'}</p>
    </Box>
    <Box>
      <strong>Employment History:</strong>
      <p>{profile.employmentHistory || 'Not provided'}</p>
    </Box>
    <Box>
      <strong>Scheduling URL:</strong>
      <p>{profile.schedulingUrl ? <a href={profile.schedulingUrl} target="_blank" rel="noopener noreferrer">Schedule a meeting</a> : 'Not available'}</p>
    </Box>
    <Box>
      <strong>Idea Commitment:</strong>
      <p>{profile.hasIdea || 'Not specified'}</p>
    </Box>
    <Box>
      <strong>Potential Ideas:</strong>
      <p>{profile.potentialIdeas?.join(', ') || 'None'}</p>
    </Box>
    <Box>
      <strong>Areas of Responsibility:</strong>
      <p>{profile.areasOfResponsibility?.join(', ') || 'Not specified'}</p>
    </Box>
    <Box>
      <strong>Cofounder Desired Qualities:</strong>
      <p>{profile.cofounderDesiredQualities?.join(', ') || 'None'}</p>
    </Box>
    <Box>
      <strong>Technical:</strong>
      <p>{profile.technical ? 'Yes' : 'No'}</p>
    </Box>
    <Box>
      <strong>Impressive Accomplishment:</strong>
      <p>{profile.impressiveAccomplishment || 'Not provided'}</p>
    </Box>
    <Box>
      <strong>LinkedIn URL:</strong>
      <p>{profile.linkedinUrl ? <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">View LinkedIn</a> : 'No LinkedIn profile'}</p>
    </Box>
  </Box>
  );
};

export default MyProfile;
