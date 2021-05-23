const express=require('express')
const mongoose=require('./db/mongoose.js')
const userRouter=require('./router/user.js')

const app=express()
const port=process.env.PORT||3000


app.use(express.json())
app.use(userRouter)  

const jwt=require('jsonwebtoken')

app.listen(port,()=>{
    console.log('Server is up on the port '+port+" !")
})