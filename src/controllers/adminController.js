const adminmodel = require('../Models/adminModel')
const jwt = require('jsonwebtoken')

const createAdmin=async function(req,res){
    let data=req.body
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please Enter the admin details" })

    let saveddata=await adminmodel.create(data)
    return res.status(201).send({message:'successfull',data:saveddata})

}

const loginAdmin = async function(req,res){
    let data=req.body
    let {email,password} = data
    if (Object.keys(data).length == 0) 
    return res.status(400).send({ status: false, message: "Please Enter admin login credentials" })

    let findAdmin= await adminmodel.findOne({email:email,password:password})
    if(!findAdmin) return res.status(401).send({status:false,message:'Please enter correct login credentials'})
    const token=jwt.sign({
         admin_Id:findAdmin._id.toString(),
        eamil_id:findAdmin.email
    },'this is my secret key')
    res.setHeader('x-api-key',token)
    res.status(201).send({status:true,data:{token:token}})
}



module.exports.createAdmin = createAdmin
module.exports.loginAdmin=loginAdmin
