const multer = require("multer")

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "./public/upload")
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, "file-" + Date.now() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1])
// 	},
// })

// exports.upload = multer({
// 	storage: storage,
// })

exports.uploadFile = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 1024 * 1024,
	},
})
