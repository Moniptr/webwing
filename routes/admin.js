var express=require('express')
var url=require('url')
var path=require('path')
var router=express.Router()
var adminmodel = require('../models/adminmodel');


//Middleware Function to authenticate admins 
router.use((req,res,next)=>{
    if(req.session.Username!=undefined && req.session.role=='admin')
    next()
    else
    res.redirect('/login')
})


router.get('/', function(req, res, next) {
    // console.log(req.session.Username)
    res.render('adminindex',{'Username':req.session.Username});
    // res.render('adminindex');

});

router.get('/manageuser', function(req, res, next) {
    adminmodel.fatchusers(req.body,(result)=>{
        res.render('manageuser',{'userDetails':result});
    })
});

router.get('/manageuserstatus', function(req, res, next) {
    var p=url.parse(req.url,true).query
    adminmodel.manageuserstatus(p,(result)=>{
        console.log(result)
        res.redirect("/admin/manageuser")
    })
});

router.get('/addcategory', function(req, res, next) {
    res.render('addcategory',{title:'Admin'});
});
router.post('/addcategory',function(req,res,next){
    var categorynm=req.body.categorynm
    var categoryicon=req.files.categoryicon
    console.log(categorynm)
    // console.log(categoryicon)
    var filenm=categoryicon.name
    var destinationpath=path.join(__dirname,"../public/uploads/"+filenm)
    
    adminmodel.addCategory(categorynm,filenm,(result)=>{
        if(result)
        {
            categoryicon.mv(destinationpath)

            res.render('addcategory',{title:'Admin'})
        }else{

            res.render('addcategory',{title:'Data Not Insert'})
        }
    })
})
router.get('/addSubcategory', function(req, res, next) {
    // console.log(req.body)
    adminmodel.fatchAll('category',(result)=>{
        res.render('addSubcategory',{title:'Admin','clist':result});
    })
});

router.post('/addSubcategory',function(req,res,next){
    var clist
    adminmodel.fatchAll('category',(result)=>{
        clist=result
    })
    var categoryname=req.body.categoryname
     console.log(categoryname)
    var subcategorynm=req.body.subcategorynm
    var subcategoryicon=req.files.subcategoryicon
    // console.log(subcategorynm)
    // console.log(subcategoryicon)
    var filenm=subcategoryicon.name;

    var destinationpath=path.join(__dirname,"../public/uploads/"+filenm)
    
    adminmodel.saveSubCategory(categoryname,subcategorynm,filenm,(result)=>{
        if(result)
        {
           subcategoryicon.mv(destinationpath)
            res.render('addSubcategory',{'clist':clist})
        }else{
            res.render('addSubcategory',{title:'Data Not Insert'})
        }
    })
})

module.exports=router; 