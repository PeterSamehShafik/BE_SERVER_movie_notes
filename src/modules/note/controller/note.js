
import noteModel from "../../../../DB/models/note.model.js";
import { asyncHandler } from "../../../middleware/errorHandling.js";
import { create, find, findById, deleteOne, updateOne } from './../../../../DB/DBmethods.js';
import userModel from './../../../../DB/models/user.model.js';



export const addNote = asyncHandler(
    async (req, res, next) => {
        req.body.userID = req.user._id
        const newNote = await create({ model: noteModel, data: req.body })
        return res.status(201).json({ message: "done", newNote })
    }
)

export const getUserNotes = asyncHandler(
    async (req, res, next) => {
        const notes = await find({ model: noteModel, filter: { userID: req.user._id } })
        return res.status(200).json({ message: "done", notes })
    }
)

export const deleteNote = asyncHandler(
    async (req, res, next) => {
        const { noteID } = req.body
        const note = await deleteOne({ model: noteModel, filter: { _id: noteID, userID: req.user._id } })
        if (note?.deletedCount) {
            return res.status(200).json({ message: "done" })
        } else {
            return next(Error("Invalid note ID", { cause: 404 }))
        }
    }
)

export const updateNote = asyncHandler(
    async (req, res, next) => {
        const { noteID } = req.body
        const updatedNote = await updateOne({ model: noteModel, filter: { _id: noteID, userID: req.user._id }, data: req.body })
        if (updatedNote?.modifiedCount) {
            return res.status(200).json({ message: "done" })
        } else {
            return next(Error("Invalid note ID", { cause: 404 }))
        }
    }
)