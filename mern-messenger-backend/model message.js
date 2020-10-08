import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    username: String,
    message: String,
    timeslang: String
}) 
export default mongoose.model('messages',messageSchema)