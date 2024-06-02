
const user_model = require("../models/user.model")

/**
 * Creste a middleware will check if the request body is proper an correct
 * 
 */

const verifySignUpBody = async (req, res, next)=>{
    try{
       //check for the name
       if(!req.body.name){
        return res.status(400).send({
            message : "Faild ! Name was not provide in request body"
        })
       }

       //check for the email
       if(!req.body.email){
        return res.status(400).send({
            message : "Faild ! Email was not provide in request body"
        })
       }
       //check for the userId
       if(!req.body.userId){
        return res.status(400).send({
            message : "Faild ! userid was not provide in request body"
        })
       }

       //check is the user with the same userid is already present
       const user = await user_model.findOne({userId : req.body.userId})
       if(user){
        return res.status(400).send({
            message : "Faild ! user with same userId is already present"
        })
       }
       next()
    }catch(err){
        console.log("error while validating the request object",err.message)
        res.status(500).send({
            messsage : "Error while validating the body"
        })
    }

}

const verifySignInBody = async (req, res, next)=>{
    if(!req.body.userId){
    return res.status(400).send({
        message : "userId is not provided"
    })
  }
  if(!req.body.password){
    return res.status(400).send({
        message : "password is not provided"
    })
  }
  next()
}

module.exports ={
    verifySignUpBody : verifySignUpBody,
    VerifySignInBody : verifySignInBody
} 