import type { Request,Response } from "express"
import { Assignment } from "../models/assessment_models.js"
import { assignmentqueue } from "../queues/assignmentqueue.js";



export const createAssessment = async(req : Request,res : Response) => {
    try {
        const assessment = await Assignment.create(req.body);
        if(assessment){
            await assignmentqueue.add('generate-paper',{
                assignmentId : assessment._id
            })
            console.log("Job added to the queue")
        }
        return res.status(201).json({
            data : assessment,
            success : true
        })
    } catch (error) {
        console.log("Assessment cannot be created!")
        return res.status(400).json({
            data : [],
            success : false
        })
    }
}

export const getAllAssessments = async(req : Request,res : Response) => {
    try {
        const id = req.body;
        const assessments = await Assignment.find({
            userId : id
        });
        return res.status(200).json({
            data : assessments,
            success : true
        })
    } catch (error) {
        console.log("Assessments cannot be fetched!")
        return res.status(400).json({
            data : [],
            success : false
        })
    }
}

export const getAssessmentById = async(req : Request,res : Response) => {
    try {
        const assessment = await Assignment.findById(req.params.id);
        return res.status(200).json({
            data : assessment,
            success : true
        })
    } catch (error) {
        console.log("Assessment cannot be fetched!")
        return res.status(400).json({
            data : [],
            success : false
        })
    }
}

export const deleteAssessment = async (req: Request, res: Response) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true })
  } catch (error) {
    console.log("Assessment cannot be deleted!")
    return res.status(400).json({ success: false })
  }
}