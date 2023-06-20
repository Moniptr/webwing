var db = require("./connection")
function adminmodel() {

    this.fatchusers=(data,cb)=>{
        let x=parseInt(data.id)
        db.collection('dataa').find({'role':'user'}).toArray((err,result)=>{
            if(result.length>0){
                cb(result)
            }else{
                console.log(err)
            }
        })
    }

this.manageuserstatus=(data,cb)=>{
    if(data.s=="block"){
        db.collection('dataa').updateOne({'_id':parseInt(data.regid)},{$set:{'status':0}},(err,result)=>{
            if(err){
                console.log(err)
            }else{
                cb(result)
            }
        })
    }else{
        db.collection('dataa').updateOne({'_id':parseInt(data.regid)},{$set:{'status':1}},(err,result)=>{
            if(err){
                console.log(err)
            }else{
                cb(result)
            }
        })

    }
}

this.addCategory = (categorynm, filenm,cb) => {
    var cDetails={} //Create an object here
    cDetails.categorynm=categorynm
    cDetails.categoryicon=filenm

    db.collection('category').find().toArray((err, result) => {
        if (err)
            console.log(err)
        else {
            if (result.length > 0) {
                var max_id = result[0]._id;
                for (let row of result) {
                    if (max_id < row._id) {
                        max_id = row._id
                    }
                    cDetails._id = max_id + 1
                }
            } else {
                cDetails._id = 1
            }
        }
        db.collection('category').insertOne
            (cDetails, (err, result) => {
                err ? console.log(err) : cb(result);
            })
    })
}


this.fatchAll = (colnm,cb) => {
    db.collection(colnm).find().toArray((err, result) => {
        if (err)
            console.log(err)
        else 
         cb(result)
        

    })
}

this.saveSubCategory = (categorynm,subcategorynm,filenm,cb) => {
    var cDetails={} //Create an object here
    cDetails.categorynm=categorynm
    cDetails.subcategorynm=subcategorynm
    cDetails.subcategoryicon=filenm


    db.collection('subcategory').find().toArray((err, result) => {
        if (err)
            console.log(err)
        else {
            if (result.length > 0) {
                var max_id = result[0]._id;
                for (let row of result) {
                    if (max_id < row._id) {
                        max_id = row._id
                    }
                    cDetails._id = max_id + 1
                }
            } else {
                cDetails._id = 1
            }
        }
        db.collection('subcategory').insertOne
            (cDetails, (err, result) => {
                if(err)
                console.log(err)
                else
                cb(result)
            })
    })
}


// this.manageuserstatus=(data,cb)=>{
//     if(data.s=="delete"){
//         db.collection('reg').remove({'_id':parseInt(data.regid)},{$set:{'role':'user'}},(err,result)=>{
//             if(err){
//                 console.log(err)
//             }else{
//                 cb(result)
//             }
//         })
//     }
// }
}
module.exports = new adminmodel()
