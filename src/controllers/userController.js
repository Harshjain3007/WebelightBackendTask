const usermodel = require('../Models/userModel')
const jwt = require('jsonwebtoken')



const createUser=async function(req,res){
    try{
    let data=req.body
      
let {fname,lname,phone,email,password} = data
   

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please Enter user data" })

    let saveddata=await usermodel.create(data)
    return res.status(201).send({message:'successfull',data:saveddata})
}
catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}




const loginUser = async function(req,res){
    let data=req.body
    let {email,password} = data
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please Enter the credentials" })

    let findUser= await usermodel.findOne({email:email,password:password})
    if(!findUser) return res.status(401).send({status:false,message:'Incorrect credentials'})
    const token=jwt.sign({
         user_Id:findUser._id.toString(),
        eamil_id:findUser.email
    },'this is the secret key')
    res.setHeader('x-api-key',token)
    res.status(201).send({status:true,data:{token:token}})
}

const getListofUsers= async function(req,res){
    let usersList = await usermodel.find()
    return res.status(200).send({status:true,data:usersList})
}


const getUserbyId = async function(req,res){
    let userId = req.params.userId
    let findUserId = await usermodel.findById(userId)
    if(!findUserId) return res.status(404).send({status:false,message:'user does not exist'})
    return res.status(200).send({status:true,data:findUserId})

}


module.exports.createUser = createUser
module.exports.loginUser=loginUser
module.exports.getListofUsers = getListofUsers
module.exports.getUserbyId = getUserbyId
