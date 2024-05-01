import React from 'react';
import Filters from '../../components/filters/filters.jsx';
import { Avatar, Grid, Button, Text, Card } from 
'@radix-ui/themes';
import { NavLink } from 'react-router-dom';

const ProfileSearch = () => {
  return (
    <>
      <Filters />
      <Grid columns={3} rows={4} tyle={{ gap: '20px', marginBottom: '20px' }}>
      {/* <Avatar>src={ avatar } </Avatar> */}
      <card style={{ display: 'flex', // Establece el contenedor para usar Flexbox
          flexDirection: 'column', // Los elementos se organizan verticalmente
          alignItems: 'flex-start', // Alinea elementos al inicio del contenedor
          justifyContent: 'space-between', // Distribuye espacio "entre" los elementos
          margin: '20px', 
          padding: '20px',
          width: '100%'}}>Profile Card
      <br/><br/><Avatar>picture</Avatar>
      <Button style={{ marginLeft: 'auto' }}>⭐</Button>
      <br/><br/><Text>Profile Name</Text><br/>
        <Text>School</Text>
      </card>
      <text style={{ margin: '20px' }}>All Profile Information</text>
      <Button>Skip for now</Button>
      <button>Message<NavLink to='/conversation'>message</NavLink></button>
      </Grid>


    </>
  );
};

export default ProfileSearch;
