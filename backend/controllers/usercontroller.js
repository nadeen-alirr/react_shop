import asynHandler from "../middleware/asynchandler.js";
import User from '../models/Usermodel.js'
import jwt from 'jsonwebtoken'
import { GenerateToken } from "../utils/generateToken.js";

// login requests
 const login =asynHandler(
    async (req ,res)=>{
    const {email ,password} = req.body;
    const user = await User.findOne({email})
    if(user && await (user.matchPassword(password))){
        GenerateToken(
           res,
           user._id
        )
        res.json({
            success : true,
            message : "User logged in",
            user : user.username,
            id : user._id

        })
     }
        else{
            res.status(401)
            throw new Error ("invalid password or email")
        }
    })


//regestration request    
 const regestrations =asynHandler(

   async (req ,res)=>{

    const {email,password,username} = req.body;

    const existing = await User.findOne({email});
    if(existing){
        res.status(400)
        throw new Error("User already exists")
    }
    else{
      try {
        const usercreated = await User.create({
            email,
            password,
            username
        })
     
        GenerateToken(
            res,
            usercreated._id
        )

        res.status(200).json({
            success : true,
            message : "User created",
            user : usercreated.username,   
            id: usercreated._id         
        })
        
      } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error("User not created")
        
      }
    }
})



 const  getUserProfile = asynHandler(
    // get all user information 
   async (req ,res)=>{
       const user = await User.findOne(req.user._id)
       if(user){
        res.status(200).json({
            success : true,
            message : "User profile",
            id: user._id ,
            user : user.username,   
            isAdmin: user.isAdmin,
            email: user.email,      
        })
       } 
       else{
           res.status(400)
           throw new Error("User not found")
       }
    }
)


//getOwnUserProfile
 const  updateOwnUserProfile=asynHandler(
   
   async (req ,res)=>{
            const user = await User.findById(req.user._id);
            if(user){
                user.username = req.body.username || user.username;
                user.email = req.body.email|| user.email;

                
                if(req.body.password){
                    user.password = req.body.password
                }


                const UserUpdated=await user.save();
    
                console.log(UserUpdated)
                 res.status(200).json({
                     success : true,
                     message : "User profile updated",
                     id: UserUpdated._id,
                     user : UserUpdated.username,   
                     isAdmin: UserUpdated.isAdmin,
                     email: UserUpdated.email,      
                 }) 
            }
            else{
                res.status(400)
                throw new Error("User not found")
            }  
        }
)


 const  Logout=asynHandler(
    (req ,res)=>{
        res.clearCookie('jwt')
        res.json({
            success : true,
            message : "User logged out"
        })
    }
)


//admin routes
 const getAllUserAdmin=asynHandler(
    (req ,res)=>{
        res.send('get all user  profile routs')

    }
)


 const  getUseByIdAdmin=asynHandler(
    (req ,res)=>{
        res.send('Get spacific user routs') 
    }
)


 const  deleteUserByIdAdmin=asynHandler(
    (req ,res)=>{
        res.send('Delete spasific user routes')
    }
)



 const  updateUserByIdAdmin=asynHandler(
    (req ,res)=>{
        res.send('Update spasific user routes')
    }
)


export { updateUserByIdAdmin,
    deleteUserByIdAdmin,
    getUseByIdAdmin,
    getAllUserAdmin,
    regestrations,
    login,
    getUserProfile,
    updateOwnUserProfile,
    Logout  
}