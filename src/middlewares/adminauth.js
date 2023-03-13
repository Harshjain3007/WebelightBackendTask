const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const adminmodel = require("../Models/adminModel");

const adminAuthentication = async function(req, res, next){

  try {

      let bearerHeader = req.headers.authorization;
      if(typeof bearerHeader == "undefined") return res.status(400).send({ status: false, message: "Token is missing" });
      
      let bearerToken = bearerHeader.split(' ');
     
      let token = bearerToken[1];

      let decodeToken = jwt.verify(token, 'this is my secret key')
 
      if (!decodeToken) {

      return res.status(401).send({ status: false, message: `Invalid Token` })}

       req.adminId = decodeToken.admin_Id

        next()


  } catch (err) {

      res.status(500).send({ status: false, message: err.message })
  }
}

const adminAuthorization = async function (req, res, next) {
  try {
    let adminId = req.params.adminId;
   

    if (!mongoose.isValidObjectId(adminId))
      return res.status(400).send({ status: false, message: "Not a valid adminId" });

    let adminDetail = await adminmodel.findById(adminId);
    if (!adminDetail)
      return res.status(404).send({ status: false, message: "No such admin found" });

     

    if (req.adminId!=adminId)
      return res
        .status(403)
        .send({ status: false, message: "You are not an authorized admin" });
    next();
  } catch (err) {
    res.status(500).send({ status: false, message: err.message }); 
  }
};

module.exports.adminAuthentication = adminAuthentication
module.exports.adminAuthorization = adminAuthorization