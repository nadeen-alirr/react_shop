import bcrypt from "bcryptjs";

const users =[
{
    username:"nadeen",
    password:bcrypt.hashSync('123456',10),
    email: "nadeen@example.com",
    isAdmin:true
},

{
    username:"nadeen2",
    password:bcrypt.hashSync('123980956',10),
    email: "nadeen2@example.com",
    isAdmin:false
},

{
    username:"nadeen3",
    password:bcrypt.hashSync('123453386',10),
    email: "nadeen3@example.com",
    isAdmin:false
}
]

export default users;