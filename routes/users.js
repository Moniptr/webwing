var express = require('express');
var router = express.Router();


//Middleware Function to authenticate Users
router.use((req,res,next)=>{
  if(req.session.Username!=undefined && req.session.role=='user' ||req.session.role=='admin' )
  next()
  else
  res.redirect('/login')
})
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userindex',{'Username':req.session.Username})
})
  
module.exports = router;
