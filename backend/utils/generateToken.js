import jwt from 'jsonwebtoken'

const GenerateToken = (res ,User_id)=>{
    const token= jwt.sign({User_id}  , process.env.JWT_SECRET , {
        expiresIn : '10h'
    })
res.cookie('jwt',token,
        {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite:'strict', 
        }
    )
    
}

export {GenerateToken}
