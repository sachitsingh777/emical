const express=require("express")
const { EmiModel } = require("../model/emi.model")
const emiRouter=express.Router()

emiRouter.post("/emical",async(req,res)=>{
    try{
        const {loan,annual,tenure}=req.body
    const rate=(annual/100)/12
    
    const emi = loan * rate* (1 + rate)*tenure / ((1 + rate)*tenure - 1) 
   
   const interest_pay=emi*tenure-loan;
   const total_payment=emi*tenure
    const data=new EmiModel({loan,annual,tenure,emi,interest_pay,total_payment})
    await data.save()
    res.status(200).send(data)
}catch(error){
    res.status(400).send({"err":error.message})
}
})

module.exports={emiRouter}