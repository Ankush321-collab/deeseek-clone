const express=require("express");

const {sendprompt}=require('../controllers/prompt.controller.js');
const { usermiddleware } = require("../middleware/prompt.middleware.js");
const router=express.Router();

router.post('/prompt',usermiddleware,sendprompt);


module.exports=router;