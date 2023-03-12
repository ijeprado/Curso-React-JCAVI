const multer = require("multer")

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/upload/users')            
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now().toString()}_${file.originalname}`)
        },
        filefilter: (req, file, cb) => {
            return cb(null, true)
        }
    })
}))