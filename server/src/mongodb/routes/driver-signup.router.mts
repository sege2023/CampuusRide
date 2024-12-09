import express from 'express'
const router  = express.Router()
import { Driver } from '../models/driver-signup.model.mjs'
router.get('/getDriver', async(req,res)=>{
    try {
        const data = await Driver.find({})
        console.log('Driver retrived')
        res.status(200).json(data)
    } catch (e) {
        console.log('Error occured retrieving students') 
    }
})

router.post('/addDriver', async(req, res)=>{
    try {
        const data = await Driver.create(req.body)
        console.log('A student has bben added to database');
        res.status(200).json(data)
    } catch (e) {
        console.log("error, creating driver")
    }
})

router.get('/:id', async(req,res) =>{
    try {
        const data = await Driver.findById(req.params.id)
        console.log('A student is retrievd by ID')
        res.status(200).json(data)
    } catch (e) {
        console.log('Error retrieving a student:' ,e)
    }
})
export {router}