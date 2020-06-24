const express = require("express");
const multer = require("multer");
const User = mongoose.model("Multer")

const router = express.Router();

//Public folder
app.use(express.static('./public'));



//set storage engine 
const storage = multer.diskStorage({
    destination: './public/uploads/',
    // By default, multer removes file extensions so let's add them back
    //cb is call back here
    filename: function(req, file, cb) {
        //as callbacks first paramter is error so we assigned it with null
        //and 2nd parameter is the filename after the file is uploaded --here we adding timestamp value(Date.now())

        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname)); //it returns the original extension of files
    }
});


//initializing upload variable and also giving some restrictions
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, //1MB
    fileFilter: (req, file, cb) => {
        checkFIleType(file, cb);
    }

}).single('myImage');

//checking the typesof files and restict them
function checkFIleType(file, cb) {
    //allowing extension
    const filetypes = /jpeg|jpg|png|gif/;
    //checking extension
    const ext = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && ext) {
        return cb(null, true);
    } else {
        return cb('Error : Images only');

    }
}


router.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', { msg: err });
        } else {

            if (!req.file) {
                res.render('index', {
                    msg: "error : no file selected"
                });
            } else {
                var imagefile=req.file.filename;
                var imageDetails=new User({
                    imgname:imagefile
                });
                imageDetails.save((err,data)=>{
                        if(err) throw err;
                        res.render('index', {
                            msg: "File Uploaded Successfully...",
                            file: `uploads/${req.file.filename}`
                        });

                });
                
            }
        }
    });
});


module.exports=router;