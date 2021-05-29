const express = require('express');

const router = express.Router();

//@route  GET api/posts
//@access public 
//@desc   Test route
router.get('/',(req,res)=>res.send('Post Route'));

module.exports=router;
