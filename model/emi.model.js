const mongoose=require("mongoose")

const EmiSchema=mongoose.Schema({
    loan:{type:Number,required:true},
    annual:{type:Number,required:true},
    tenure:{type:Number,required:true},
    emi:{type:Number,required:true},
    interest_pay:{type:Number,required:true},
    total_payment:{type:Number,required:true},
    emiId:{type:String}
})

const EmiModel=mongoose.model("emi",EmiSchema)
module.exports={EmiModel}