import React from 'react'
import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS =[
    {
        id: 'm1',
        title: 'A first meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1024px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some Address 5, 12345 Some City',
        description: 'This is a first meetup'
    },
    {
        id: 'm2',
        title: 'A second meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1024px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some Address 10, 12345 Some City',
        description: 'This is a second meetup'
    }
]

const HomePage = () => {
  return (
    <MeetupList meetups={DUMMY_MEETUPS} />
  )
}

export default HomePage