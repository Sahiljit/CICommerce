import bcrypt from 'bcryptjs'

const users = [
    {
        name:'admin',
        email:'admin@example.com',
        password:bcrypt.hashSync('1234',10),   //used synchronous function only
        isAdmin:true                           // coz we have only 3 passwords to encrypt
        
    },
    {
        name:'sahil',
        email:'sahil@example.com',
        password:bcrypt.hashSync('1234',10),


    },
    {
        name:'karan',
        email:'karan@example.com',
        password:bcrypt.hashSync('1234',10),

        
    }
]

export default users