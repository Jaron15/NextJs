import React from 'react';
import { MongoClient } from 'mongodb'

import MeetupList from '../components/meetups/MeetupList';
import Link from 'next';

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
 const client = await MongoClient.connect(process.env.CONNECT_STRING);
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const meetups = await meetupsCollection.find().toArray();
        client.close();

 //must return an object
 //must have props 
    return {
        props: {
            meetups: meetups.map(meetup =>( {
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
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