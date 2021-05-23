const express=require('express')
const User = require('../models/user.js')
const auth=require('../middleware/authorization.js')
const router=new express.Router()

router.post('/users/signin',async (req,res)=>{
   const user=new User(req.body)

   try{
       const token=await user.generateAuthToken()
       await user.save()
       res.status(201).send({user,token})
   }catch(error){
       res.status(400).send(error)
   }
})

router.post('/users/login',async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(error){
        res.status(400).send(error)
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
       req.user.tokens=req.user.tokens.filter((token)=>{
           return token.token !==req.token
       })

       await req.user.save()

       res.send()
    }catch(error){
       res.status(500).send()
    }
})

router.post('/users/logoutall',auth,async(req,res)=>{
    try{
       req.user.tokens=[]
       await req.user.save()
       res.send()
    }catch(error){
        res.status(500).send()
    }
})

router.get('/users/me',auth, async(req,res)=>{
     res.send(req.user)
})

module.exports=router
