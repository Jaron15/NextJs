import { MongoClient } from 'mongodb'

// /api/new-meetup
//POST /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
//the req body is what is sent to the addMeetupHandler function from newMeetupForm through props
//NewMeetupForm.js(collects enteredData) => new-meetup/index.js(sends a req to this api w enteredData)
        const data = req.body;
//connect to backend 
        const client = await MongoClient.connect(process.env.NEXT_PUBLIC_CONNECT_STRING);
        const db = client.db();
//meetups collection 
        const meetupsCollection =db.collection('meetups');
//add a document with meetup data to the meetups collection with insertOne method 
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();
//sending back a response message 
        res.status(201).json({message: 'Meetup Inserted!'});
    } 
}
export default handler;