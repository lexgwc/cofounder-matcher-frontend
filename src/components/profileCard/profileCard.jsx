import { Card, Text } from "@radix-ui/themes";

const ProfileCard = (props) => {
  const {profile} = props;

  return (

<Card style={{ display: 'flex', 
    flexDirection: 'column',
    alignItems: 'flex-start', 
    justifyContent: 'space-between',
    margin: '20px', 
    padding: '20px',
    width: '100%'}}>Profile Card
<br/><br/>

{/* <Avatar>picture</Avatar> */}

{/* <Button style={{ marginLeft: 'auto' }}onClick={addToFavorites}>⭐</Button> */}
<br/><br/><Text>{profile.fullName}</Text><br/>
  {/* <Text>{profile.currentSchool}</Text> */}
</Card>
  )
}

export default ProfileCard;