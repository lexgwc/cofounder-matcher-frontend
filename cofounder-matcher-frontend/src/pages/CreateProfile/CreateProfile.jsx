import React from 'react'

import { Flex, Button, Avatar, Heading, Text, TextField, DropdownMenu, ScrollArea, Progress, Box } from '@radix-ui/themes'

const CreateProfile = () => {





  return (
    <>
      <Heading>Create Profile</Heading>
      <Box maxWidth="300px">
        <Progress value={33}/>
      </Box>
      <br/>
      <Text size="5">Basic Information</Text>
      <input type="file"  accept="image/*" />
      <br/>
      <Text>Add a profile picture</Text>
      
      
      <form action="/editprofile" method="post">
        
        <br/>
        {/* First Name */}
        <label for="firstName">First name:</label>
        <br/>
        <input type="text" id="firstName" name="firstName" />
        <br/>

        {/* Last Name */}
        <label for="lastName">Last name:</label>
        <br/>
        <input type="text" id="lastName" name="lastName" />
        <br/>

        {/* Date of Birth */}
        <label for="birthdate">Birthdate:</label>
        <br/>
        <input type="date" id="birthdate" name="birthdate" />
        <br/>

        {/* School */}
        <label for="currentSchool">School:</label>
        <br/>
        <select id="currentSchool" name="currentSchool" >
        <option value="">Select School</option>
        </select>
        <br/>


        {/* About Me */}
        <label for="about">About me:</label>
        <br/>
        <input type="text" id="about" name="about" />
        <br/>

        {/* Linkedin */}
        <label for="linkedinURL">LinkedIn URL:</label>
        <br/>
        <input type="url" id="linkedinURL" name="linkedinURL"/>
        <br/>

        {/* Email */}
        <label for="email">Email:</label>
        <br/>
        <input type="string" id="email" name="email"/>
        <br/>

        {/* Scheduling URL */}
        <label for="schedulingURL">Scheduling Link:</label>
        <br/>
        <input type="url" id="schedulingURL" name="schedulingURL"/>
        <br/>

        {/*Submit Button*/}
        <input type="submit" value="Save and Continue"/>
        <br/>

      </form>
    </>
  )
}

export default CreateProfile


// Old code using radix:


// <Heading>Create Profile</Heading>
// <Text>Basic Information</Text>
// <Avatar>Avatar</Avatar>
// <Text>Add a profile picture</Text>
// <br/>

// {/* First Name */}
// <Text>What is your first name?</Text>
// <TextField.Root placeholder="Full Name">
// </TextField.Root>

//  {/* Last Name */}
// <Text>What is your last name?</Text>
// <TextField.Root placeholder="Full Name">
// </TextField.Root>

// {/* Date of Birth */}
// <Text>When is your birthday?</Text>
// <input type="date"/>


// {/* School */}
// <Text>Where are you currently in school?</Text>
// <label for="currentSchool">School:</label>
//         <select id="currentSchool" name="currentSchool" >
//             <option value="">Select School</option>
//         </select>
