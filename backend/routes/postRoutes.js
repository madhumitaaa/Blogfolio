const express=require('express');
const router=express.Router();
const Post=require('../models/Post');
const slugify=require('slugify');

router.post('/create',async(req,res)=>{
    const{title,content}=req.body;
    const slug=slugify(title,{lower:true,strict:true});
    try{
        const newpost=await Post.create({title,content,slug});
        res.status(201).json(newpost);
       }catch(err){
          res.status(500).json({err:"failed to create"});
       }
})

router.get('/',async(req,res)=>{
    const posts=await Post.find().sort({createdAt:-1});
    res.json(posts);
})
router.get('/:slug',async(req,res)=>{
    const posts=await Post.findOne({slug:req.params.slug});
    res.json(posts);
})
router.put('/:slug',async(req,res)=>{
    const{title,content}=req.body;
    const newslug=slugify(title,{lower:true,strict:true});
    const updated=await Post.findOneAndUpdate({slug:req.params.slug},
    {title,content,slug:newslug},
    {new:true}
    );
    res.json(updated);
})
router.delete('/:slug',async(req,res)=>{
    await Post.findOneAndDelete(
         {slug:req.params.slug}
    )
     res.json({ message: "Deleted" });
})
module.exports=router;