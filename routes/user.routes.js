const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../model/user.model")
const { logged } = require("../middleware/logged")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    try{
        bcrypt.hash(password, 5,async(err,hash)=>{
          const user=new UserModel({name,email,password:hash})
          await user.save()
          res.status(200).send({"msg":"Registration succesfull"})
         });
    }
    catch(error){
        res.status(400).send({"err":"error.message"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        let user=await UserModel.findOne({email})

        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
               
                if(result){
                    const token = jwt.sign({ userID:user._id,name:user.name,email:user.email }, 'mock');
                    res.status(200).send({"msg":"login succesfull","token":token})
                }else{
                    res.status(200).send({"err":"wrong credentials"})
                }
            });
        }else{
            res.status(400).send({"err":"wrong credentials"})
        }
    }
    catch(error){
        res.status(400).send({"err":error.message})
    }
})

userRouter.get("/getprofile",logged,async(req,res)=>{
    const {userID}=req.body
    let user=await UserModel.findOne({_id:userID})
try{
    if(user){
        res.status(200).send({name:user.name,email:user.email})
    }else{
        res.send({msg:"something went wrong"})
    }
}
catch(error){
    res.send({err:error.message})
}
   
})
emiRouter.get("/emical",async(req,res)=>{
    try{
        const {loan,annual,tenure}=req.query
        loan=+loan
        annual=+annual
        tenure=+tenure
    const rate=(annual/100)/12
    
    const emi = loan * rate* (1 + rate)**tenure / ((1 + rate)**tenure - 1) 
   
   const interest_pay=emi*tenure-loan;
   const total_payment=emi*tenure
   let data={
    emi:emi.toFixed(2),
    interest_pay:interest_pay.toFixed(2),
    total_payment:total_payment.toFixed(2)
   }
    
    res.status(200).send(data)
}catch(error){
    res.status(400).send({"err":error.message})
}
})
module.exports={userRouter}