import React, { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/meetupDetail';

const meetupDetails = (props) => {
  return (
    <MeetupDetail 
    image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1024px-Stadtbild_M%C3%BCnchen.jpg" 
    title="First Meetup" 
    address='Some Street 5, Some City' 
    description='This is a first meetup' />
  )
}

export default meetupDetails