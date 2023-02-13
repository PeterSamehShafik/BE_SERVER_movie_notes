import { Router } from 'express'
import * as noteController from './controller/note.js'
import * as validators from './note.validation.js'
import { validation } from './../../middleware/validation.js';
import auth from './../../middleware/auth.js';

const router = Router()

router.post('/addNote', auth(), noteController.addNote)
router.get('/getUserNotes', auth(), noteController.getUserNotes)
router.delete('/deleteNote', auth(), noteController.deleteNote)
router.put('/updateNote', auth(), noteController.updateNote)



export default router