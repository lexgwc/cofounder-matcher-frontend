import React from 'react'
import { Text, Box, Heading } from '@radix-ui/themes'
import { useState, useEffect } from 'react'
import { getSchoolById } from '../../services/apiServices'

const SchoolCount = () => {
  const [ harvardCount, setHarvardCount ] = useState(0)
  const [ stanfordCount, setStanfordCount ] = useState(0)

  const schoolsArray = [{id: '663135ef4475f6285743d7ae', school: 'Harvard', count: harvardCount}, {id: '663135ef4475f6285743d7af', school: 'Stanford', count: stanfordCount}]

  const schoolCount = []

  useEffect(() => {
    const getSchoolCounts = async () => {
      schoolsArray.map((school) => {
        const schoolObj = getSchoolById(school.id)
        schoolCount.push(schoolObj.numberOfProfiles)
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