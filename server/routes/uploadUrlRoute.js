import express from 'express'
import { getUploadUrl } from '../controller/uploadUrlController.js'
import multer from 'multer'

const upload = multer()

const router = express.Router()

router.post('/get-upload-url', upload.single('image'),getUploadUrl)

export default router 