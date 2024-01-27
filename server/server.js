import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import uploadUrlRoute from './routes/uploadUrlRoute.js'
import cors from 'cors'; // Import the cors middleware
import admin from 'firebase-admin'
import serviceAccountKey from './mern-blog-web-app-firebase-adminsdk-tskzb-b37cc939a6.json' assert { type: 'json' };


const server = express();
let PORT = process.env.PORT || 3000

server.use(express.json())
server.use(cors());
server.use(express.urlencoded({
    extended: true
}));
server.use('/api', uploadUrlRoute)
server.use('/api/user', userRoutes)
server.use('/api/blog', blogRoutes)
server.use('/api/comment', commentRoutes)

admin.initializeApp({ credential: admin.credential.cert(serviceAccountKey) })

mongoose.connect(process.env.MONGODB_URI, { autoIndex: true }).then((res) => console.log('database connection successfull')).catch((err) => console.log(`error in database connection : ${err}`))

server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}
)
server.listen(PORT, () => { console.log(`server is listening to the port ${PORT}`) })