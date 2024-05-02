import React from 'react'
import { Text, Box, Heading } from '@radix-ui/themes'
import { useState, useEffect } from 'react'
import { getSchoolById } from '../../services/apiServices'

const SchoolCount = () => {
  const [ harvardCount, setHarvardCount ] = useState(0)
  const [ stanfordCount, setStanfordCount ] = useState(0)

  const schoolsArray = [{id: '663135ef4475f6285743d7ae', name: 'Harvard', count: harvardCount}, {id: '663135ef4475f6285743d7af', name: 'Stanford', count: stanfordCount}]

  const schoolCount = []

  useEffect(() => {
    const getSchoolCounts = () => {
      schoolsArray.map(async (school) => {
        const schoolObj = await getSchoolById(school.id)
        console.log(schoolObj)
        schoolCount.push(schoolObj.data.numberOfProfiles)
      })
    }
    getSchoolCounts()
    setHarvardCount(schoolCount[0])
    setStanfordCount(schoolCount[1])
  },[])


  return (
    <>
      {schoolsArray.map((school,index) => (
        <Box key={index}>
          <Heading>{school.count}</Heading>
          <Text>{school.school}</Text>
        </Box>  
      ))}
    </>
  )
}

export default SchoolCount