import { Schema, model, Types } from 'mongoose'

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, "title required"],
        min: [2, "Length of title must be more than 2 "],
        max: [50, "Length of title must not be more than 50 "],
    },
    desc: {
        type: String,
        required: [true, "description required"],
        min: [1, "Length of description must be more than 1 "],
        max: [200, "Length of description must not be more than 200 "],
    },
    userID: {
        type: Types.ObjectId,
        required:true,
        ref:'User'
    }

}, {
    timestamps: true
})


const noteModel = model('Note', noteSchema)

export default noteModel