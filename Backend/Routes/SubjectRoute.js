import express from "express";
import { protectRoute } from "../Middleware/protectRoute.js";
import { Addsubject,GetSubject } from "../Controllers/SubjectController.js";

const router = express.Router();

router.post('/subject',protectRoute,Addsubject)
router.get('/:Uid',protectRoute,GetSubject)

export default router;