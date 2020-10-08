//import dependencies
import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'
import mongoMessages from './model message.js'
//app config
const app = express()
const port = process.env.PORT || 9000
const pusher = new Pusher({
    appId: '1086638',
    key: '2df0af866a473151a929',
    secret: '72a24e23ed45aea97af8',
    cluster: 'ap2',
    useTLS: true
  });

//middlewares
app.use(express.json())
app.use(cors())

//db config
const mongoURI = 'mongodb+srv://admin:xAghOW5iBppk5pwP@cluster0.aegcg.mongodb.net/messengerDB?retryWrites=true&w=majority'
mongoose.connect(mongoURI,{
    userCreateIndex:true,
    userNewUrlParser: true,
    useUnifiedTopology:true
})
mongoose.connection.once('open', () => {
    console.log('Db connected')
    const changeStream = mongoose.connection.collection('messages').watch()
    changeStream.on('change',(change)=>{
        pusher.trigger('messages','newMessage',{
            'change':change
        });

    })
})

//api routes
app.get('/',(req,res) => res.status(200).send('hello world'))

app.post('/save/message',(req,res) => {
    const dbMessage = req.body
    console.log(dbMessage)
    mongoMessages.create(dbMessage,(err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

app.get('/retrieve/conversation', (req,res) => {
    mongoMessages.find((err,data)=> {
        if(err){
            res.status(500).send(err)
        }
            
        else{
            data.sort((b,a)=> {
                return a.timestamp - b.timestamp
            } );
            res.status(200).send(data)
        }
    }) 
})
//listener
app.listen(port, () => console.log(`Listening on localhost:${port}`))
