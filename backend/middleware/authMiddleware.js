import jwt from 'jsonwebtoken'
import User from '../models/Usermodel.js'
import asynHandler from './asynchandler.js'


//protect routes
 export const protect =asynHandler(
    async (req,res,next)=>{
        let token ;
        //take the taken and  ensure from it 
        token = req.cookies.jwt;
        console.log("the token is " + token);


          if(token){
            try {

               const decoded=jwt.verify(token, process.env.JWT_SECRET)
               req.user= await User.findById(decoded.User_id).select('-password')
               console.log(req.user)
                next()
                
            } catch (error) {
                console.log(error)
                res.status(401);
                throw new Error('token failed')               
            }
          }else{
            res.status(401);
            throw new Error('no token found')
          }
    }
) 


// admin Middleware
export const isadmin = asynHandler(async (req,res,next) => {
  const isAdmin = req.user && req.user.isAdmin ;
  if(isAdmin){
      console.log(" is user admin ? " + isAdmin)
      next();
  }else{
    console.log(" is user admin ? " + isAdmin)
      res.status(403);
      throw new Error('not authorized as admin')
  }
})


 




