var fs = require("fs");
var path = require('path')

//The function to return file size in KB
function getFileSizeInKB(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes/1024.0;
}

// A object to store the file details
module.exports.fileDetails = function (name,filepath) {
    this.filename = name;
    this.filepath = filepath;
    this.content = fs.readFileSync(this.filepath, "binary",(err, Buffer) => {
            if(err){
                console.error(err);
                return err;
            }
            return Buffer;    
    });
    this.size = getFileSizeInKB(this.filepath);
    this.extention = path.extname(this.filename)
}

//function to upload
module.exports.mongoUploadOne = function(Collection,document)
{
    Collection.insertOne(document)
    .then(result => {
        console.log("Done");
    })
    .catch(error => console.error(error))
}

//function to retreive
module.exports.mongoRetreive = function(collection,query={},options={})
{
    Collection.find(query,options).toArray()
    .then(Data => {    
        return Data;
    })
    .catch((error) => {
        console.error(error);
    })
}
