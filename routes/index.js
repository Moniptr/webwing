var express = require('express');
var router = express.Router();
const indexmodel = require('../models/indexmodel');



// For authentication and back button destory and manage users code is
router.use('/login',(req,res,next)=>{
  if(req.session.Username!=undefined)
  req.session.destroy()
  next()
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registration', function (req, res, next) {
  res.render('registration')
})

router.post('/registration', function (req, res, next) {
  indexmodel.registration(req.body, (result) => {
    res.render('registration', { 'msg': 'Data stored Properly' })
  })
  // console.log(req.body)
})

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post('/login', function (req, res, next) {
  indexmodel.loginCheck(req.body, (result) => {

    // to store user details in session
    req.session.Username=result[0].Username
    req.session.role=result[0].role
    if (result.length > 0)
     {
      if (result[0].role == 'admin')    
        res.redirect("/admin")
      else
        if (result[0].role == 'user')
          res.redirect("/users")
    } else {
      res.render('login', { title: 'Express' })
    }
  }
  )
})

module.exports = router;
