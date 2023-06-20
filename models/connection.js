var mongoose=require("mongoose")
var url="mongodb://127.0.0.1:27017/busines"
mongoose.connect(url)
var db=mongoose.connection
console.log("Sucessfully Connected to mongodb database")

module.exports=db