import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as driversignupRouter } from './mongodb/routes/verification.router.mjs';
import register_router from './mongodb/routes/temp-user-reg.route.mjs';
dotenv.config();

// const MongoDB_Connection_String = 'mongodb://localhost:27017'
const MongoDB_Connection_String = 'mongodb://127.0.0.1:27017';
// const MongoDB_Connection_String = 'mongodb://localhost'

async function connecttoMongoDB(ConnectionString:string) {
    console.log('testing')
    await mongoose.connect(ConnectionString);
    console.log('Connected to MongoDB database')
}
try {
    await connecttoMongoDB(MongoDB_Connection_String)
} catch (e) {
    console.log('Error conecting to MongoDB', e)
}

const PORT = 9000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())
app.use(cookieParser());

app.use('/api', register_router)
app.get('/', (req,res) =>{
    res.status(200).send('hello, world!');
});

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});