/**
 * Post localhost:8888/ecomm/app/v1/signup
 * 
 * i need to intercept this
 */
const authController =require("../controller/auth.controller")
const authMw = require("../middlewares/auth.mw")
module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMw.verifySignUpBody],authController.signup)

    /**
     * routes for
     * POST 0.0.0.0:8888/ecomm/api/v1/auth/signin
     */

    app.post("/ecomm/api/v1/auth/signin",[authMw.VerifySignInBody],authController.signin)
}