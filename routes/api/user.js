const express = require('express');

const router = express.Router();

//@route  POST api/user
//@access public 
// @desc   Register user
router.post('/',(req,res)=>
{
    console.log(req.body);
    
    res.send('User Route')
});

module.exports=router;
