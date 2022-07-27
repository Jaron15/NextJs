import React, { Fragment } from 'react';
import { MongoClient } from 'mongodb'
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';
import Link from 'next';

const HomePage = (props) => {
   
  return (
    <Fragment>
    <Head>
        <title>React Meetups</title>
        <meta 
        name='description'
        contents="Browse a huge list of highly active React meetups!"
        />
    </Head>
    <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

//function that comes with nextjs that gets the props used in the 
//HomePage component BEFORE rendering HomePage
//this code will not show up on the server side 
//this will fetch the data for prerendering 
export async function getStaticProps() {
 //fetch data form an API 
 const client = await MongoClient.connect(process.env.NEXT_PUBLIC_CONNECT_STRING);
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