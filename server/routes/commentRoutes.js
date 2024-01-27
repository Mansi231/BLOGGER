import express from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { AddComment } from "../controller/commentController.js";

const router = express.Router()

router.post('/add-comment',verifyJWT,AddComment)

export default router