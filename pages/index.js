import React from 'react';

import MeetupList from '../components/meetups/MeetupList';
import Link from 'next';

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

const HomePage = (props) => {
   
  return (
    <MeetupList meetups={props.meetups} />
  )
}

//function that comes with nextjs that gets the props used in the 
//HomePage component BEFORE rendering HomePage
//this code will not show up on the server side 
//this will fetch the data for prerendering 
export async function getStaticProps() {
 //fetch data form an API 

 //must return an object
 //must have props 
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        revalidate: 1,
    }
} 

// export async function getServerSideProps(context) {
// const req = context.req;
// const res = context.res;
//     return {
//         props: {
//         meetups: DUMMY_MEETUPS
//     }
//     }
// }

export default HomePage