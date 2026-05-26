import express from 'express'
import { Assignment } from '../models/assessment_models.js';
import { createAssessment } from '../controllers/assessment.js';

const router = express.Router();


router.get('/check',(req,res) => {
    return res.json({
        success : true
    })
})

router.post("/create-assessment",createAssessment)

export default router

//we need to make middleware as well