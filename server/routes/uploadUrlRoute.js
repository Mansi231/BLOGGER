import express from 'express'
import { getUploadUrl } from '../controller/uploadUrlController.js'

const router = express.Router()

router.get('/get-upload-url',getUploadUrl)

export default router 