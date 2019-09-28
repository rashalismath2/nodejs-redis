const express=require("express");
const router=express.Router();
const redis=require("redis");

const redisClient=redis.createClient(6379);

router.get("/",(req,res,next)=>{
    res.render("searchusers");
})

router.post("/user",cached,(req,res,next)=>{
   res.render("searchusers");
})


function cached(req,res,next){
    if(req.body.id!==""){
        redisClient.hgetall(req.body.id,(error,data)=>{
            if(error){
                return res.render("searchusers",{errors:error})
            }
            if(data){
                data.id=req.body.id;
                return res.render('searchusers',{data:data});
            }
            next();
        })
    }
    else{
        next();
    }
}


module.exports=router;