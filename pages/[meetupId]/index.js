import React, { Fragment } from 'react';
import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head';

const MeetupDetails = (props) => {
  return (
    <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta 
            name="description"
            content={props.meetupData.description}
            />
        </Head>
    <MeetupDetail 
    image={props.meetupData.image} 
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description} />
    </Fragment>
  )
}

export async function getStaticPaths() {
    //connect to the backend
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_CONNECT_STRING);
        const db = client.db();
        //meetups collection
        const meetupsCollection = db.collection('meetups');
//find with an empty obj first brings back all documents(no filter)
//second arg is what fields should be extracted from all those documents (id in this case)
        const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
        client.close();
    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => 
        ({ params: {meetupId: meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    //fetch data for a single meetup 
//grabs the param from url that should be the meetupId
    const meetupId = context.params.meetupId;
//connect to backend 
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_CONNECT_STRING);
        const db = client.db();
        //go into the meetups collection 
        const meetupsCollection = db.collection('meetups');
//findOne where the id value is equal to the meetupId we get from the params in the url
        const selectedMeetup = await meetupsCollection.findOne({
//ObjectId is a feature of mongo its how the id is stored there 
            _id: ObjectId(meetupId)
        })
        client.close();

    return {
//the returned data is passed thru props to the meetupDetails function above 
//which gives the data to the meetupDetail component function to render the data 
        props: {
//the id needs to be converted to a string to be used in the app 
//therefore you have to retrun this object so you can set the id .toString()
//otherwise you could just return selectedMeetup for meetupData
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails