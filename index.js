const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');
const creds = require("./config");
const { route } = require('express/lib/application');
const transport = {
    host:"smtp.gmail.com",
    port : 465,
    auth : {
        user:creds.USER,
        pass: creds.PASS
    }

}
const transporter = nodemailer.createTransport(transport)
transporter.verify((error,success)=>{
    if (error) {
        console.log(error)
    }
    else {
        console.log("Server is ready to take messages")
    }
})
router.post("/send",(req,res,next)=>{
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    const content = `name: ${name} \n email: ${email}  \n message : ${message}`
    const mail = {
        from :name,
        to : "sandeepkaur.sk.9041@gmail.com",
        subject : "New Message from Contact Form",
        text : content
    }
    transporter.sendMail(mail,(err,data)=>{
        if(err){
            res.json({
                status : "fail"
            })
        }else {
            res.json({
                status : "success"
            })
        }
    })
})

const app= express()
app.use(cors())
app.use(express.json())
app.use("/",router)
app.listen(3002)