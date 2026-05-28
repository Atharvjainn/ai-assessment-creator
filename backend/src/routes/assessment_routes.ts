import express from 'express'
import { createAssessment,getAllAssessments,getAssessmentById } from '../controllers/assessment.js';

const router = express.Router();


router.get('/check',(req,res) => {
    return res.json({
        success : true
    })
})

router.post("/create-assessment",createAssessment)
router.get('/get-assessments',getAllAssessments);
router.get('/get-assessment/:id',getAssessmentById);



export default router

//we need to make middleware as well