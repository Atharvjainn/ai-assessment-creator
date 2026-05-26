import express from 'express'
import { Assignment } from '../models/assessment_models.js';

const router = express.Router();


router.get('/check',(req,res) => {
    return res.json({
        success : true
    })
})

router.post("/create-assessment",async(req,res) => {
    const response = await Assignment.create(req.body);

    return res.json({
        'test' : "success",
         data : response
    })
})

export default router