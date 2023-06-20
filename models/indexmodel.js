
// const e = require("express");
var db = require("./connection")
function indexmodel() {

    // this.showData=(data,cb)=>{
    //     let x=parseInt(data.id)
    //     db.collection('reg').find({"_id":x}).toArray((err,result)=>{
    //         if(result.length>0){
    //             cb(result)
    //         }else{
    //             console.log(err)
    //         }
    //     })
    // }


    this.loginCheck  = (userDetails, cb) => {
        db.collection('dataa').find({ "Username": userDetails.Username, "password": userDetails.password,'status':1 }).toArray((err, result) => {
            if(err){
                console.log(err)
            }else{
                cb(result)
            }
        })
    }


//     this.userUpdate = async(userDetails,cb) => {
//         x = parseInt(userDetails.id);

//         // console.log(userDetails.id)
//         // console.log(userDetails.Name)
//         // console.log(userDetails.Email)
//         // console.log(userDetails.Username)
//         // console.log(userDetails.password)    
//         // console.log(userDetails.address)
//         // console.log(userDetails.phonenumber)
//         let result = await db.collection('reg').updateOne({ "_id": x },
//          {
//             $set:{"Name":userDetails.Name,"Email":userDetails.Email,"Username":userDetails.Username,"password":userDetails.password,"address":userDetails.address,"phonenumber":userDetails.phonenumber}
//         })
//         cb(result)
        
//     }



    this.registration = (userDetails, cb) => {
        db.collection('dataa').find().toArray((err, result) => {
            if (err)
                console.log(err)
            else {
                if (result.length > 0) {
                    var max_id = result[0]._id;
                    for (let row of result) {
                        if (max_id < row._id) {
                            max_id = row._id
                        }
                        userDetails._id = max_id + 1
                    }
                } else {
                    userDetails._id = 1
                }
            }

            userDetails.status = 1
            userDetails.role = "admin"
            userDetails.dt = Date()
            db.collection('dataa').insertOne
                (userDetails, (err, result) => {
                    err ? console.log(err) : cb(result);
                })
        })
    }
}

module.exports = new indexmodel()