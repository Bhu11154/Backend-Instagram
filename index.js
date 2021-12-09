const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors());

const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

mongoose.connect("mongodb+srv://Bhu1:MNCCS@cluster0.yhyjg.mongodb.net/DBKGP?retryWrites=true&w=majority", 
                 {useNewUrlParser:true, 
                  useUnifiedTopology:true, 
                  useFindAndModify:false,
                  useCreateIndex:true,}, ()=>{
    console.log('MongoDB is Connected...');
})
app.listen(process.env.PORT||7001, ()=> console.log('Server is running...'))
